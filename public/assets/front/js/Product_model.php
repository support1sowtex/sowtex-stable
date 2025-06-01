    <?php if (!defined('BASEPATH')) exit('No direct script access allowed');

    class Product_model extends CI_Model
    {
      function __construct()
      {
        ini_set('display_errors', 0);
        parent::__construct();
        $this->load->database();
      }

      function searchProductByContent(){ //exit;
        $content = $this->input->post('searchText');
        $cat = $this->input->post('cat_id');
        $sub_cat = $this->input->post('sub_cat');
        $size = $this->input->post('size');
        $color = trim($this->input->post('color'));
        $country = trim($this->input->post('country'));
        $companies = $this->input->post('companies');
        $state = $this->input->post('states');
        $cities = $this->input->post('cities');
        $this->db->select('distinct(xx_product.id),xx_product.featured,xx_product.gold,xx_product.cloud_path,
        xx_product.orgId,xx_product.category_id,xx_product.sub_category_id,
        ,xx_product.unique_id,xx_product_size.size,xx_product_color.colorHexCode as color,
        xx_organisation.stateId,xx_organisation.cityId,xx_product.image');
        $this->db->from('xx_product');
        $this->db->join('xx_product_size', 'xx_product_size.productId   = xx_product.id');
        $this->db->join("xx_product_color", 'xx_product_color.productId   = xx_product.id');
        $this->db->join("xx_organisation", "xx_organisation.orgId=xx_product.orgId");
        
        $this->db->join("xx_org_category", "xx_org_category.orgId=xx_organisation.orgId");
        $this->db->where('xx_product.listing', 'public');
        $this->db->where("xx_product.category_id", $cat);
        
        if ($sub_cat != "0") {
          $this->db->where("xx_product.sub_category_id", $sub_cat);
        }
        if ($companies != "All Companies") {
          $this->db->where("xx_organisation.orgId", $companies);
        }
        if ($country != "All Country") {
          
          $this->db->where("xx_organisation.countryId", $country);
        }
        if ($state != "All States") {
          $this->db->join("xx_states", "xx_states.id=xx_organisation.stateId");
          $this->db->where("xx_states.id", $state);
        }
        if ($cities != "All City") {
          $this->db->join("xx_cities", "xx_cities.id=xx_organisation.cityId");
          $this->db->where("xx_cities.id", $cities);
        }
        // if ($sub_cat) {
        //   $this->db->where("xx_product.sub_category_id ", $sub_cat);
        // }
        if ($size != "All Size") {
          $this->db->where('xx_product_size.size', explode(" ", $this->input->post('size_text'))[0]);
          $this->db->where('xx_product_size.uom', $size);
        }
        if ($color != "All Colors") {
          $this->db->where('xx_product_color.colorHexCode', $color);
        }

        if ($this->input->post('searchText')) {
          $this->db->group_start();
          $this->db->where("xx_product.content like ", "%" . $this->input->post('searchText') . "%");
          $this->db->or_where("xx_product.description like ", "%" . $this->input->post('searchText') . "%");
          $this->db->group_end();
        }
        //ini_set("display_errors",1);
        $this->db->group_by('xx_product.id');
        $this->db->order_by("xx_product.featured", "Y");
        $this->db->order_by("xx_product.gold", "Y");
        $this->db->order_by("xx_product.createdDate", "Desc");
        //$last_query=$this->db->get()->num_rows();

        $final_array['noofProduct'] = $this->db->get()->num_rows();
        //echo $this->db->last_query();//exit;
        $last_query = explode("LIMIT", $this->db->last_query())[0];
        //$final_array['noofProduct']=$count_product=$this->db->get()->num_rows();
        if ($this->input->post('start') > $final_array['noofProduct']) {
          $final_array[''] = '';
          $final_array['end'] = '';
          return $final_array;
          exit;
        }
        if ($final_array['noofProduct'] > 12) {
          $last_query = explode("LIMIT", $this->db->last_query())[0];
          $result = $this->db->query($last_query . " limit " . $this->input->post('start') . ", 12")->result_array();
          //echo $this->db->last_query();
        } else {
          $last_query = explode("LIMIT", $this->db->last_query())[0];
          $result = $this->db->query($last_query)->result_array();
        }
        //echo $this->db->last_query();getSubCategoryNameById
        if ($result) {
          foreach ($result as $row) {
            $data['unique_id'] = $row['unique_id'];
            $data['cat'] = $this->Front_model->getCategoryNameById($row['category_id']);
            $data['sub_cat'] = $this->Front_model->getSubCategoryNameById($row['sub_category_id']);
            $data['org'] = $this->Front_model->getOrgnizationsNameByOrgId($row['orgId']);
            $data['orgId'] = $row['orgId'];
            $product_ids[] = $data['prod_id'] = $row['id'];
            //$data['image'] = explode("___,", trim($row['cloud_path'], "___,"));
            //print_r($row);exit;
            $data['image'] = unserialize($row['image']);
            $data['loc'] = $this->Front_model->getOrgnizationsCountrybyId($row['orgId']);
            if ($row['verify'] == "Y") {
              $data['verified'] = "Verified";
            } else {
              $data['verified'] = "Listed";
            }
            $data['featured'] = $row['featured'];
            $data['gold'] = $row['gold'];
            $data['city'] = $this->Front_model->getCityById($this->Front_model->getOrgnizationsCitybyId($row['orgId']));
            $final_array[] = $data;
          }
          $final_array['end'] = $this->input->post('start') + 12;
          return $final_array;
        }
      }

      function searchStockByContent(){
        
        //print_r($this->input->post());exit;
        $searchText=$this->input->post('searchText');
        $cat = $this->input->post('cat_id');
        $sub_cat = $this->input->post('sub_cat');
        $size = $this->input->post('size');
        $country = trim($this->input->post('country'));
        $companies = $this->input->post('companies');
        $state = $this->input->post('states');
        $cities = $this->input->post('cities');
        $this->db->select('distinct(xx_stock.id),xx_stock.orgId	,xx_stock_image.stockImage as image,xx_stock.listing,xx_stock.stockUniqueId,xx_stock.location,xx_stock.categoryId,xx_stock.subcategoryId,xx_stock.createdDate,xx_stock.updatedDate,xx_countries.id as count_id,xx_countries.name');
        $this->db->from('xx_stock');
        $this->db->join('xx_stock_image', 'xx_stock.id  = xx_stock_image.stockId');
        $this->db->where("xx_stock.categoryId", $cat);
        $this->db->where("xx_stock.deleted","N");
        $this->db->join("xx_organisation", "xx_organisation.orgId=xx_stock.orgId");
        $this->db->join('xx_countries', 'xx_organisation.countryId   = xx_countries.id');
        //echo $this->input->post('sub_cat');exit;
        if ($this->input->post('sub_cat')!='all Category') {
          $this->db->where("xx_stock.subcategoryId", $this->input->post('sub_cat'));
        }

        $size=$this->input->post('size');
        
        if ($size != "All Size") {
          $num= (int) $size;
          $str=ltrim((string) $size, $num);
          $this->db->join("xx_stock_size", 'xx_stock.id  = xx_stock_size.stockId');
          $this->db->where('xx_stock_size.sizeNumber like','%'.$num.'%');
          $this->db->where('xx_stock_size.sizeUnit like ','%'.ltrim($str).'%');
        }
        if ($this->input->post('content')) {
          $this->db->group_start();
          $this->db->where("xx_stock.content like ", "%" . $this->input->post('content') . "%");
          $this->db->or_where("xx_stock.description like ", "%" . $this->input->post('content') . "%");
          $this->db->group_end();
        }
        $color=$this->input->post('color');
        //echo $color;exit;
        if($color!="All Colors"){
          $this->db->join("xx_stock_color", 'xx_stock_color.stockId  = xx_stock.id');
          $this->db->where('xx_stock_color.colorCode',$color);
        }
        $country=$this->input->post('country');
        if($country!="All Country"){
          
          $this->db->where("xx_organisation.countryId", $country);

        }
        $state=$this->input->post('states');
        if ($state != "All States") {
          $this->db->join("xx_states", "xx_states.id=xx_organisation.stateId");
          $this->db->where("xx_states.id", $state);
        }
        $city=$this->input->post('cities');
        if ($city != "All City") {
          $this->db->join("xx_cities", "xx_cities.id=xx_organisation.cityId");
          $this->db->where("xx_cities.id", $city);
        }
        $company=$this->input->post('companies');
        if($company!="All Companies"){
          
          $this->db->where("xx_organisation.orgId", $company);

        }
        //$this->db->group_by('xx_stock.id');
        $this->db->group_by('xx_stock.id');
        //$query = $this->db->get()->result_array();
        $final_array['noofstock'] = $this->db->get()->num_rows();
        //echo $this->db->last_query();//exit;
        $last_query = explode("LIMIT", $this->db->last_query())[0];
        //echo $this->db->last_query();exit;
        //$final_array['noofProduct']=$count_product=$this->db->get()->num_rows();
        if ($this->input->post('start') > $final_array['noofstock']) {
          $final_array[''] = '';
          $final_array['end'] = '';
          return $final_array;
          exit;
        }
        if ($final_array['noofstock'] > 12) {
          $last_query = explode("LIMIT", $this->db->last_query())[0];
          $query = $this->db->query($last_query . " limit " . $this->input->post('start') . ", 12")->result_array();
          //echo $this->db->last_query();
        } else {
          $last_query = explode("LIMIT", $this->db->last_query())[0];
          $query = $this->db->query($last_query)->result_array();
        }
        
        $country=array();
        $orgs=array();
        foreach ($query as $result) {
          $country[$result['count_id']]=$result['name'];
          $result1['id'] = $result['id'];
          $result1['listing'] = $result['listing'];
          $result1['stockUniqueId'] = $result['stockUniqueId'];
          $result1['loc'] = $result['location'];
          $result1['quan'] = $result['quantity'];
          $orgs[$result['orgId']]= $this->Front_model->getOrgNameByOrgId($result['orgId']);
          $result1['cat'] = $this->Front_model->getCategoryNameById($result['categoryId']);
          $result1['sub_cat'] = $this->Front_model->getSubCategoryNameById($result['subcategoryId']);
          if(strtotime($result['updatedDate'])>strtotime($result['createdDate'])){
            $result1['updatedDate'] = date("d-m-Y",strtotime($result['updatedDate']));
          }
          else {
            $result1['updatedDate'] = date("d-m-Y",strtotime($result['createdDate']));
          }
          $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();
          $size_str = '';
          $color_str = '';
          foreach ($data as $key => $value) {
            //$size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
            $sizes[]=$value['sizeNumber'] . " " . trim($value['sizeUnit']);
          }
          $color = $this->db->select('colorCode as color,id')->from('xx_stock_color')->where('stockid', $result['id'])->get()->result_array();
          $img = $this->db->select('stockImage as image')->from('xx_stock_image')->where('stockId', $result['id'])->get()->result_array();
          foreach ($color as $key => $value) {
            $color_str .= $value['color'] . ", ";
            $colors[$value['id']]=$value['color'];
          }
          $result1['quantity'] = $result['quantity'] . " " . $result['quantity_unit'];
          $result1['image'] = $img[0]['image'];
          $result1['color'] = $color_str;
          $result1['sizes'] = $size_str;
          //$result1['countries']=$country;
          
          $result1['user_id']=$this->session->userdata('user_id');
          $final_data[] = $result1;
          
        }
        if (count($query) < 1) {
          $data['status'] = 'error';
        }
        $data['orgs']=array_unique($orgs);
        $data['sizes']=array_unique($sizes);
        $data['colors']=array_unique($colors);
        $data['products']=$final_data;
        $data['country']=array_unique($country);
        //print_r($data['orgs']);
        if($country!="All Country"){
          $data['states']=$this->Front_model->getStockStatebyCountryandOrg($data['orgs'],$this->input->post('country')); 
        }
        if($state!="All States"){
          $data['cities']=$this->Front_model->getStockCitybyCountryandStateAndOrg($data['orgs'],$this->input->post('country'),$this->input->post('state')); 
        }
        $data['end'] = $this->input->post('start') + 12;
       
        // echo "<pre>";
       //print_r($final_data);exit;
        return $data;
      }

      function getSizeByCategoryId($array)
      {
        $this->db->select('distinct (size)');
        $this->db->from('xx_product_size');
        $this->db->where("productId  IN (" . implode(',', $array) . ")");
        $result = $this->db->get()->result_array();
        //echo $this->db->last_query();exit;
        return $result;
      }
      function getColorByCategoryId($cat_id)
      {

        $this->db->select('distinct(colorName) as color,id')->from('xx_master_color');
        $this->db->where("categoryId", $cat_id)->order_by("colorName");
        $result = $this->db->get()->result_array();
        //echo $this->db->last_query();
        return $result;
      }


      function getLatestProduct()
      {
        $this->db->select('*');
        $this->db->from('xx_product');
        $this->db->order_by('createdDate', 'asc')->limit(50);
        $result['products'] = $this->db->get()->result_array();
        foreach ($result['products'] as $row) {
          $prod_id[] = $row['id'];
        }
        $result['sizes'] = $this->getSizeByCategoryId(array_unique($prod_id));
        return $result;
      }
      function storeProductViewedById($id, $unique_id)
      {
        $product_view['prod_id'] = $id;
        $product_view['unique_id'] = $unique_id;
        $this->db->insert("xx_product_views", $product_view);
      }
      function getProductDetail($array)
      {

        $this->db->select('*');
        $this->db->from('xx_product');
        $this->db->where($array);
        $data = $this->db->get()->result_array();
        //echo $this->db->last_query();exit;
        foreach ($data as $key => $result) {
          $result1['id'] = $result['id'];
          $result1['unique_id'] = $result['unique_id'];
          $result1['image'] = unserialize($result['image']);
          $result1['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['category_id'])->get()->row_array()['category'];
          $result1['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subCategoryId', $result['sub_category_id'])->get()->row_array()['subCategoryName'];
          $data = $this->db->select('size,uom')->from('xx_product_size')->where('productid', $result['id'])->get()->result_array();
          $result1['category_id'] = $result['category_id'];
          $result1['sub_category_id'] = $result['sub_category_id'];
          $result1['verify'] = $result['verify'];
          $nsize = $size = $sizes = $uom = $uom_name = [];
          $this->storeProductViewedById($result['id'], $result['unique_id']);
          $a = '';
          $sizes = $this->Front_model->getProductSizeById($result['id']);
          //print_r($sizes);
          foreach ($sizes as $key => $value) {
            $a .= $value['size'] . ", ";
          }
          //echo $a;
          //print_r($sizes);exit;
          $result1['sizes'] = rtrim($a, ", ");
          $result1['sku'] = $result['sku'];
          $result1['listing'] = $result['listing'];
          $result1['content'] = $result['content'];
          $result1['description'] = $result['description'];
          $result1['moq'] = $result['moq'];
          $result1['costing'] = $result['costing'];
          $result1['art_no'] = $result['sku'];
          $result1['pub_date'] = substr($result['createdDate'], 0, 10);
          $result1['color'] = $this->db->select('colorHexCode as color')->from('xx_product_color')->where('productid', $result['id'])->get()->result_array();
          $result1['org'] = $this->getOrgDetailByOrgId($result['orgId']);
          $result1['count']=$this->Front_model->getNoofProductInCategory($result['category_id']);
          // echo $result1['org']['countryId'];
          // exit;
          $result1['location'] = $this->Front_model->getCountryNameByid($result1['org']['countryId']);
          //exit;
        }
        //echo "<pre>";print_r($result1);exit;
        return $result1;
      }
      function getSizes()
      {

        return $array = array("1" => "Inches", "2" => "Meter", "3" => "mm", "4" => "Pieces", "5" => "Kilograms", "6" => "Gross");
      }

      function getProductDetailByProductId($id) {

        $this->db->select('*');
        $this->db->from('xx_product');
        $this->db->where("id", $id);
        $data = $this->db->get()->result_array();
        foreach ($data as $key => $result) {
          $result1['id'] = $result['id'];
          $result1['unique_id'] = $result['unique_id'];
          $result1['feature'] = $result['featured'];
          $result1['image'] = unserialize($result['image']);
          //print_r($result1);exit;
          foreach ($this->getProductColorById($result['id']) as  $row) {
            $prod_color[] = $row['color'];
          };
          $result1['prod_col'] = $prod_color;
          //print_r($prod_color);exit;

          $result1['cat_color'] = $this->getColorByCategoryId($result['category_id']);
          // echo "<pre>";
          // print_r($result1);
          // exit;
          //$result1['cat_name']=$this->db->select('category')->from('xx_category')->where('id',$result['category_id'])->get()->row_array()['category'];
          //$result1['sub_cat_name']=$this->db->select('subCategoryName')->from('xx_sub_category')->where('subCategoryId',$result['sub_category_id'])->get()->row_array()['subCategoryName'];
          $data = $this->db->select('size,uom')->from('xx_product_size')->where('productid', $result['id'])->get()->result_array();
          $result1['category_id'] = $result['category_id'];
          $result1['sub_category_id'] = $result['sub_category_id'];
          $result1['subcatagoryofCat'] = $this->Product_model->getSubCategoryOfCat($result['category_id']);
          // $sizes=
          //$uomOfPro=$this->Front_model->getAllunitOfMeasurementofProductById($result['id']);
          //print_r($result1['color']);exit;
          // print_r($sizes);exit;

          // $nsize = $size = $sizes = $uom = $uom_name = [];
          // foreach ($data as $key => $value) {
          //   $sizes[] = $value['size'];
          //   $uom[] = $value['uom'];
          // }
          // $data = $this->db->select("name")->from("xx_cat_uom")->where("id IN (" . implode(',', $uom) . ")")->get()->result_array();
          // foreach ($data as $key => $value) {
          //   $uom_name[] = $value['name'];
          // }
          // $a = '';
          // foreach ($sizes as $size) {
          //   $a .= $size . " " . $value['name'] . ", ";
          // }
          // //
          // //print_r($sizes);exit;
          // $result1['sizes'] = $a;
          // //getProductSizeById
          $result1['prod_sizes'] = explode(",", $this->Front_model->getProductSizeById($result['id'])[0]['size']);
          $result['uomOfPro'] = $this->Front_model->getAllunitOfMeasurementofProductById($result['id']);
          //print_r($result1);exit;
          //$result1['drop_size'] = $this->getSizes();
          $result1['listing'] = $result['listing'];
          $result1['content'] = $result['content'];
          $result1['description'] = $result['description'];
          $result1['moq'] = $result['moq'];
          $result1['teamView'] = $result['teamView'];
          $result1['costing'] = $result['costing'];
          $result1['art_no'] = $result['sku'];
        }
        //  echo "<pre>";
        // print_r($result1);exit;
        return $result1;
      }
      function getProductDetailForAdminByProductId($id)
      {

        $this->db->select('*');
        $this->db->from('xx_product');
        $this->db->where("id", $id);
        $data = $this->db->get()->result_array();

        foreach ($data as $key => $result) {
          $result1['id'] = $result['id'];
          $result1['unique_id'] = $result['unique_id'];
          $result1['featured'] = $result['featured'];
          $result1['gold'] = $result['gold'];
          $result1['assured'] = $result['assured'];
          $result1['image'] = unserialize($result['image']);
          foreach ($this->getProductColorById($result['id']) as  $row) {
            $prod_color[] = $row['color'];
          };
          $result1['prod_col'] = $prod_color;

          $result1['cat_color'] = $this->getColorByCategoryId($result['category_id']);
          $data = $this->db->select('size,uom')->from('xx_product_size')->where('productid', $result['id'])->get()->result_array();
          $result1['category_id'] = $result['category_id'];
          $result1['sub_category_id'] = $result['sub_category_id'];
          $result1['subcatagoryofCat'] = $this->Product_model->getSubCategoryOfCat($result['category_id']);
          $nsize = $size = $sizes = $uom = $uom_name = [];
          foreach ($data as $key => $value) {
            $sizes[] = $value['size'];
            $uom[] = $value['uom'];
          }
          $data = $this->db->select("name")->from("xx_cat_uom")->where("id IN (" . implode(',', $uom) . ")")->get()->result_array();
          foreach ($data as $key => $value) {
            $uom_name[] = $value['name'];
          }
          $a = '';
          foreach ($sizes as $size) {
            $a .= $size . " " . $value['name'] . ", ";
          }
          $result1['sizes'] = $a;
          $result1['drop_size'] = $this->getSizes();
          $result1['listing'] = $result['listing'];
          $result1['content'] = $result['content'];
          $result1['description'] = $result['description'];
          $result1['moq'] = $result['moq'];
          $result1['teamView'] = $result['teamView'];
          $result1['costing'] = $result['costing'];
          $result1['art_no'] = $result['sku'];
        }
        return $result1;
      }

      public function getProductColorById($prod_id)
      {
        $result = $this->db->select('distinct(colorHexCode) as color,Id')->from('xx_product_color')->where('productid', $prod_id)->get()->result_array();
        return $result;
      }
      function getCountryNameByid($orgid)
      {
        $result = $this->db->select('name')->from('xx_countries')->where('id', $orgid)->get()->row();
        //echo $this->db->last_query();print_r($result);exit;
        //exit;
        return $result->name;
      }
      function getOrgDetailByOrgId($orgId)
      {
        $result = $this->db->select('*')->from('xx_organisation')->where('orgId', $orgId)->get()->row_array();
        return $result;
      }

      function filterSearchProduct()
      {
      }

      function getRelatedProducts()
      {
      }

      function store_enquary($data)
      {

        if ($this->db->insert("xx_enquiry", $data)) {
          return 1;
        } else {
          return 0;
        }
      }

      function similar_product()
      {
        //ini_set("display_errors",1);
        $this->db->select('*')->from('xx_product')
         
          ->where('orgId', $this->input->post('orgId'))
          ->limit(6);
        $result = $this->db->get()->result_array();
        //echo $this->db->last_query();
        if (count($result) < 1) {
          $this->db->select('*')->from('xx_product')
            ->where('category_id', $this->input->post('categoryId'))
            ->where('orgId ', $this->input->post('orgId'))
            ->limit(6);
          $result = $this->db->get()->result_array();
          if (count($result) < 1) {
            $this->db->select('*')->from('xx_product')
              ->where('category_id', $this->input->post('categoryId'))
              ->where('orgId ', $this->input->post('orgId'))
              ->limit(6);
            $result = $this->db->get()->result_array();
            if (count($result) < 0) {
              $result = $this->db->select('*')->from('xx_product')
                ->where('category_id', $this->input->post('categoryId'))
                ->limit(6)->get()->result_array();
              //return $result;

            }
            //return $result;exit;
          }
          //return $result1;exit;
        }
        foreach ($result as $row) {
          $data['id'] = $row['id'];
          $data['unique_id'] = $row['unique_id'];
          $data['city'] = $this->Front_model->getCityById($this->Front_model->getOrgnizationsCitybyId($row['orgId']));
          $data['image'] = unserialize($row['image']);
          //$data['image'] = explode("___,", trim($row['cloud_path'], "___,"))[0];
          $final_data[] = $data;
        }
        return $final_data;
      }

      function getSubCategoryOfCat($cat_id)
      {

        $result = $this->db->select('*')->from('xx_sub_category')->where('categoryId', $cat_id)->order_by("subCategoryName")->get()->result_array();
        return $result;
      }
      function getStockDetailsByUniqueIdForAdmin($id)
      {
        $this->db->select('xx_stock.*,xx_stock_image.stockImage,xx_organisation.supplier');
        $this->db->from('xx_stock');
        $this->db->join('xx_stock_image', 'xx_stock.id  = xx_stock_image.stockId');
        $this->db->join("xx_organisation", "xx_organisation.orgId=xx_stock.orgId");
        $this->db->where("xx_stock.stockUniqueId", $id);
        $result = $this->db->get()->row_array();
        //echo $this->db->last_query();exit;
        $result1['stockUniqueId'] = $result['stockUniqueId'];
        $result1['id'] = $result['id'];
        $result1['cat_id'] = $result['categoryId'];
        $result1['sub_cat_id'] = $result['subcategoryId'];
        $result1['listing'] = $result['listing'];
        $result1['acticleNumber'] = $result['acticleNumber'];
        $result1['quantity'] = $result['quantity'];
        $result1['quantity_unit'] = $result['quantity_unit'];
        $result1['drop_size'] = $this->getSizes();
        $result1['price'] = $result['price'];
        $result1['assured'] = $result['assured'];
        $result1['content'] = $result['content'];
        $result1['description'] = $result['description'];
        $result1['currency'] = $result['currency'];
        //echo $result['id'];exit;
        $result1['image'] = $this->getStockImagesbyId($result['id']);
        //$result1['subcatagoryofCat'] = $this->Product_model->getSubCategoryOfCat($result['categoryId']); 
        $result1['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['categoryId'])->get()->row_array()['category'];
        $result1['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subCategoryId', $result['subcategoryId'])->get()->row_array()['subCategoryName'];
        //$result['size'] = $this->db->select('sizeNumber')->from('xx_stock_size')->where('stockId', $result['id'])->get()->row_array()['sizeNumber'];
        $color = $this->db->select('colorCode as color')->from('xx_stock_color')->where('stockId', $result['id'])->get()->result_array();
        $result1['org'] = $this->getOrgDetailByOrgId($result['orgId']);
        $result1['location'] = $result['location'];
        //$result1['cat_color']=$this->getColorByCategoryId($result['categoryId']);
        $sizes = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();
        $color_str = '';
        foreach ($color as $key => $value) {
          $color_str .= $value['color'] . ", ";
        }

        $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();
        $size_str = '';

        foreach ($data as $key => $value) {
          $size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
        }

        //print_r($stock_color);exit;
        $result1['description'] = $result['description'];
        $result1['quantity'] = $result['quantity'];
        $result1['content'] = $result['content'];
        $result1['colors'] = rtrim($color_str);
        $result1['sizes'] = rtrim($size_str);
        $result1['orgName'] = $result['orgName'];
        $result1['emps'] = $this->Front_model->getOrgnizationsNoOfEmp($result['orgId']);
        //echo $this->db->last_query();exit;
        $result1['est_year'] = $this->Front_model->getOrgnizationsYearOfEst($result['orgId']);
        $result1['supplier'] = $result['supplier'];
        // echo "<pre>";
        // print_r($result1);                    
        //  exit;
        return $result1;
      }
      function getStockDetail($unique_id)
      {
        $this->db->select('xx_stock.*,xx_stock_image.stockImage');
        $this->db->from('xx_stock');
        $this->db->join('xx_stock_image', 'xx_stock.id  = xx_stock_image.stockId');
        $this->db->where("xx_stock.stockUniqueId", $unique_id);
        $result = $this->db->get()->row_array();
        $result1['assured'] = $result['assured'];
        $result1['artNum'] = $result['acticleNumber'];

        $result1['stockUniqueId'] = $result['stockUniqueId'];
        $result1['id'] = $result['id'];
        $result1['category_id'] = $result['categoryId'];
        $result1['sub_category_id'] = $result['subcategoryId'];
        $result1['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['categoryId'])->get()->row_array()['category'];
        $result1['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subCategoryId', $result['subcategoryId'])->get()->row_array()['subCategoryName'];
        $color = $this->db->select('colorCode as color')->from('xx_stock_color')->where('stockId', $result['id'])->get()->result_array();
        $result1['org'] = $this->getOrgDetailByOrgId($result['orgId']);
        $result1['orgId'] = $result['orgId'];
        $result1['location'] = $result['location'];
        $result1['count']=$this->Front_model->getNoofStocksInCategory($result['categoryId']);
        $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();
        $size_str = '';
        $color_str = '';
        foreach ($data as $key => $value) {
          $size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
        }
        //$result1['currency'] = $this->Front_model->getCurrencyByid($result['currency']);
        $result1['currency'] = $result['currency'];
        $result1['price'] = $result['price'];
        $img = $this->db->select('stockImage as image')->from('xx_stock_image')->where('stockId', $result['id'])->get()->result_array();
        foreach ($color as $key => $value) {
          $color_str .= $value['color'] . ", ";
        }
        $result1['description'] = $result['description'];
       // $result1['createdDate'] = $result['createdDate'];
        if(strtotime($result['updatedDate'])>strtotime($result['createdDate'])){
          $result1['updatedDate'] = $result['updatedDate']; 
          
        }
        else {
          $result1['updatedDate'] = $result['createdDate'];
           
        }

    
        $result1['quantity'] = $result['quantity'];
        $result1['moq'] = $result['moq'];
        $result1['unit'] = $result['quantity_unit'];
        $result1['content'] = $result['content'];
        $result1['colors'] = $color_str;
        $result1['sizes'] = $size_str;
        $result1['image'] = $img;
        //print_r($result1);exit;
        return $result1;
      }

      function getStockImagesbyId($id)
      {
        $img = $this->db->select('stockImage as image')->from('xx_stock_image')->where('stockId', $id)->get()->result_array();
        return $img;
      }

      function getStockDetailById($id){
        $this->db->select('xx_stock.*,xx_stock_image.stockImage');
        $this->db->from('xx_stock');
        $this->db->join('xx_stock_image', 'xx_stock.id  = xx_stock_image.stockId');
        $this->db->where("xx_stock.id", $id);
        $result = $this->db->get()->row_array();
        $result1['stockUniqueId'] = $result['stockUniqueId'];
        $result1['id'] = $result['id'];
        $result1['cat_id'] = $result['categoryId'];
        $result1['sub_cat_id'] = $result['subcategoryId'];
        $result1['listing'] = $result['listing'];
        $result1['acticleNumber'] = $result['acticleNumber'];
        $result1['quantity'] = $result['quantity'];
        $result1['moq'] = $result['moq'];
        $result1['quantity_unit'] = $result['quantity_unit'];
        $result1['drop_size'] = $this->getSizes();
        $result1['price'] = $result['price'];
        $result1['costing'] = $result['costing'];
        $result1['assured'] = $result['assured'];
        $result1['content'] = $result['content'];
        $result1['description'] = $result['description'];
        $result1['currency'] = $result['currency'];
        $result1['cur_id'] = $this->Front_model->getCurrencyidByName($result['currency']);
        $result1['images'] = $this->getStockImagesbyId($id);
        $result1['subcatagoryofCat'] = $this->Product_model->getSubCategoryOfCat($result['categoryId']);
        $result1['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['categoryId'])->get()->row_array()['category'];
        $result1['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subCategoryId', $result['subcategoryId'])->get()->row_array()['subCategoryName'];
        //$result['size'] = $this->db->select('sizeNumber')->from('xx_stock_size')->where('stockId', $result['id'])->get()->row_array()['sizeNumber'];
        $color = $this->db->select('colorCode as color')->from('xx_stock_color')->where('stockId', $result['id'])->get()->result_array();
        //$result1['org'] = $this->getOrgDetailByOrgId($result['orgId']);
        $result1['location'] = $result['location'];
        $result1['cat_color'] = $this->getColorByCategoryId($result['categoryId']);
        $sizes = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();
        foreach ($color as $col) {
          $stock_color[] = $col['color'];
        }
        //print_r($stock_color);exit;
        $result1['description'] = $result['description'];
        $result1['quantity'] = $result['quantity'];
        $result1['content'] = $result['content'];
        $result1['stock_color'] = $stock_color;
        $result1['sizes'] = $sizes;
        $result1['id']=$id;
        // echo "<pre>";
        // print_r($result1);                    
        //  exit;
        return $result1;
      }

      public function getAllStockForSuperAdmin()
      {
        //ini_set("display_errors",1);
        $data = $this->db->select("*")->from("xx_stock")->order_by("createdDate", "DESC")->limit(50)->get()->result_array();
        foreach ($data as $key => $result) {
          $result1[$result['id']]['id'] = $result['id'];
          $result1[$result['id']]['listing'] = $result['listing'];
          $result1[$result['id']]['unique_id'] = $result['stockUniqueId'];
          $result1[$result['id']]['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['categoryId'])->get()->row_array()['category'];
          $result1[$result['id']]['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subcategoryId', $result['subcategoryId'])->get()->row_array()['subCategoryName'];
          $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();

          $size_str = '';
          $color_str = '';
          foreach ($data as $key => $value) {
            $size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
          }
          $color = $this->db->select('colorCode as color')->from('xx_stock_color')->where('stockid', $result['id'])->get()->result_array();
          $img = $this->db->select('stockImage as image')->from('xx_stock_image')->where('stockId', $result['id'])->get()->result_array();
          foreach ($color as $key => $value) {
            $color_str .= $value['color'] . ", ";
          }

          $result1[$result['id']]['orgId'] = $result['orgId'];
          $result1[$result['id']]['image'] = $img;
          $result1[$result['id']]['color'] = $color_str;
          $result1[$result['id']]['sizes'] = $size_str;
          $result1[$result['id']]['listing'] = $result['listing'];
          //print_r($result1);exit;
        }
        return $result1;
      }
      public function getAllStockOfOrg($orgid)
      {
        $this->db->select('*')->from('xx_stock');
        $this->db->where('orgId', $orgid)->order_by("id", 'desc');
        $data = $this->db->get()->result_array();
        //echo $this->db->last_query();exit;
        foreach ($data as $key => $result) {
          $result1[$result['id']]['id'] = $result['id'];
          $result1[$result['id']]['listing'] = $result['listing'];
          $result1[$result['id']]['unique_id'] = $result['stockUniqueId'];
          $result1[$result['id']]['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['categoryId'])->get()->row_array()['category'];
          $result1[$result['id']]['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subcategoryId', $result['subcategoryId'])->get()->row_array()['subCategoryName'];
          $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();

          $size_str = '';
          $color_str = '';
          foreach ($data as $key => $value) {
            $size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
          }
          $color = $this->db->select('colorCode as color')->from('xx_stock_color')->where('stockid', $result['id'])->get()->result_array();
          $img = $this->db->select('stockImage as image')->from('xx_stock_image')->where('stockId', $result['id'])->get()->result_array();
          foreach ($color as $key => $value) {
            $color_str .= $value['color'] . ", ";
          }

          $result1[$result['id']]['image'] = $img;
          //print_r($img);exit;
          $result1[$result['id']]['color'] = $color_str;
          $result1[$result['id']]['sizes'] = $size_str;
          $result1[$result['id']]['listing'] = $result['listing'];
        }
        //  echo "<pre>";
        //  print_r($result1);exit;
        return $result1;
      }
      public function getAllStockOfOrg1($orgid)
      {
        $this->db->select('*')->from('xx_stock');
        $this->db->where('orgId', $orgid)->order_by("id", 'desc');
        $data = $this->db->get()->result_array();
        //echo $this->db->last_query();exit;
        $result1['count']=count($data);
        foreach ($data as $key => $result) {
          $result1[$result['id']]['id'] = $result['id'];
          $result1[$result['id']]['listing'] = $result['listing'];
          $result1[$result['id']]['unique_id'] = $result['stockUniqueId'];
          $result1[$result['id']]['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['categoryId'])->get()->row_array()['category'];
          $result1[$result['id']]['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subcategoryId', $result['subcategoryId'])->get()->row_array()['subCategoryName'];
          $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();

          $size_str = '';
          $color_str = '';
          foreach ($data as $key => $value) {
            $size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
          }
          $color = $this->db->select('colorCode as color')->from('xx_stock_color')->where('stockid', $result['id'])->get()->result_array();
          $img = $this->db->select('stockImage as image')->from('xx_stock_image')->where('stockId', $result['id'])->get()->result_array();
          foreach ($color as $key => $value) {
            $color_str .= $value['color'] . ", ";
          }

          $result1[$result['id']]['image'] = $img[0]['image'];
          //print_r($img);exit;
          $result1[$result['id']]['color'] = $color_str;
          $result1[$result['id']]['sizes'] = $size_str;
          $result1[$result['id']]['listing'] = $result['listing'];
        }
        //  echo "<pre>";
        //  print_r($result1);exit;
        return $result1;
      }
      public function getShortlistedProductsOfUser($user_id)
      {
        $this->db->select('*');
        $this->db->from('xx_cartorg');

        return $this->db->where('createdBy', $user_id)->get()->num_rows();
      }
      public function shorlisted_products(){
        $this->db->select('xx_product.*');
        $this->db->from('xx_product');
        $this->db->join('xx_cartproduct', 'xx_cartproduct.productId  = xx_product.id');
        $this->db->where('xx_cartproduct.createdBy', $this->session->userdata('user_id'));
        $this->db->group_by("xx_product.id");
        $data = $this->db->get()->result_array();
        //echo $this->db->last_query();
        foreach ($data as $result) {
          $res[$result['id']]['id'] = $result['id'];
          $res[$result['id']]['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['category_id'])->get()->row_array()['category'];
          $res[$result['id']]['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subCategoryId', $result['sub_category_id'])->get()->row_array()['subCategoryName'];
          //$res[$result['id']]['size'] = $this->db->select('size')->from('xx_product_size')->where('productid', $result['id'])->get()->row_array()['size'];
          //$res[$result['id']]['color'] = $this->db->select('colorHexCode as color')->from('xx_product_color')->where('productid', $result['id'])->get()->result_array();
          $res[$result['id']]['unique_id'] = $result['unique_id'];
          $res[$result['id']]['image'] = unserialize($result['image']);
          $res[$result['id']]['listing'] = $result['listing'];
          $res[$result['id']]['views'] = rand(200, 5000);
          $sizes = $this->Front_model->getProductSizeById($result['id']);
          $a = '';
          $prod_color = '';
          foreach ($sizes as $key => $value) {
            $a .= str_replace(",", ", ", $value['size']) . ", ";
          }
          $res[$result['id']]['size'] = rtrim($a, ", ");
          foreach ($this->getProductColorById($result['id']) as  $row) {
            $prod_color .= $row['color'] . ", ";
          };
          $res[$result['id']]['color'] = rtrim($prod_color, ", ");
        }
        //print_r($res);exit;
        return $res;
      }
      public function getAllProductsofOrgForCatalogue()
      {
        $this->db->select('*')->from('xx_product');
        $this->db->where('orgId', $this->session->userdata('orgId'))->
        limit(50)->order_by("id", 'desc');
        $data = $this->db->get()->result_array();

        foreach ($data as $key => $result) {
          $result1[$result['id']]['id'] = $result['id'];
          $result1[$result['id']]['listing'] = $result['listing'];
          $result1[$result['id']]['unique_id'] = $result['unique_id'];
          // if ($result['id'] < 15360) {
          //   $result1[$result['id']]['image'] =  $result['image'];
          // } else {

          // }
          $result1[$result['id']]['image'] = unserialize($result['image']);
          $result1[$result['id']]['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['category_id'])->get()->row_array()['category'];
          $result1[$result['id']]['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subCategoryId', $result['sub_category_id'])->get()->row_array()['subCategoryName'];
          $data = $this->db->select('size,uom')->from('xx_product_size')->where('productid', $result['id'])->get()->result_array();
          $nsize = $size = $sizes = $uom = $uom_name = [];
          $sizes = $this->Front_model->getProductSizeById($result['id']);
          $a = '';
          foreach ($sizes as $key => $value) {
            $a .= str_replace(",", ", ", $value['size']) . ", ";
          }
          if ($uom[0] != '') {
            $data = $this->db->select("name")->from("xx_cat_uom")->where("id IN (" . implode(',', $uom) . ")")->get()->result_array();
            foreach ($data as $key => $value) {
              $uom_name[] = $value['name'];
            }
          }
          $result1[$result['id']]['sizes'] = trim($a, ", ");
          $prod_color = '';
          foreach ($this->getProductColorById($result['id']) as  $row) {
            $prod_color .= $row['color'] . ", ";
          };
          $result1[$result['id']]['color'] = rtrim($prod_color, ", ");
          $result1[$result['id']]['org'] = $this->getOrgDetailByOrgId($result['orgId']);
        }
        return $result1;
      }
      public function getAllProducts($orgid)
      {
        $this->db->select('*')->from('xx_product');
        if($this->session->userdata('type')=="User"){
          $this->db->where("createdBy",$this->session->userdata('user_id'));
        }
        $this->db->where('orgId', $orgid);
        $this->db->order_by("id", 'desc');
        //$this->db->limit(10);
        $data = $this->db->get()->result_array();
        $result1['count']=count($data);
        foreach ($data as $key => $result) {
          $result1[$result['id']]['id'] = $result['id'];
          $result1[$result['id']]['listing'] = $result['listing'];
          $result1[$result['id']]['unique_id'] = $result['unique_id'];
          $result1[$result['id']]['views'] = rand(333, 5000);
          $result1[$result['id']]['image'] =  unserialize($result['image']);
          $result1[$result['id']]['featured'] =  $result['featured'];
          $result1[$result['id']]['gold'] =  $result['gold'];
          //print_r($result1);exit;
          $result1[$result['id']]['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['category_id'])->get()->row_array()['category'];
          $result1[$result['id']]['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subCategoryId', $result['sub_category_id'])->get()->row_array()['subCategoryName'];
          $data = $this->db->select('size,uom')->from('xx_product_size')->where('productid', $result['id'])->get()->result_array();
          $nsize = $size = $sizes = $uom = $uom_name = [];
          $sizes = $this->Front_model->getProductSizeById($result['id']);
          $a = '';
          foreach ($sizes as $key => $value) {
            $a .= str_replace(",", ", ", $value['size']) . ", ";
          }

          if ($uom[0] != '') {
            $data = $this->db->select("name")->from("xx_cat_uom")->where("id IN (" . implode(',', $uom) . ")")->get()->result_array();
            foreach ($data as $key => $value) {
              $uom_name[] = $value['name'];
            }
          }
          $result1[$result['id']]['sizes'] = trim($a, ", ");
          $result1[$result['id']]['color'] = $this->db->select('colorHexCode as color')->from('xx_product_color')->where('productid', $result['id'])->get()->result_array();
          $result1[$result['id']]['org'] = $this->getOrgDetailByOrgId($result['orgId']);
        }
        
        return $result1;
      }



      public function delete_product(){
        
        $images=$this->getProductImagesById($this->input->post('id'));
       

        // deleting product sizes

        $size_arr['productId']=$this->input->post('id');
        $this->db->where($size_arr);

        // deleting product color

        $this->db->delete("xx_product_size");
        $color_arr['productId']=$this->input->post('id');
        $this->db->where($color_arr);
        $this->db->delete("xx_product_color");

        // deleting product row from product table

        $prod_del['orgId'] = $this->input->post('orgId');
        $prod_del['id'] = $this->input->post('id');
        $this->db->where($prod_del); //echo 1;
        $result = $this->db->delete('xx_product',$prod_del);
        //echo $this->db->last_query();
        foreach($images as $row){
          //echo base_url()."assets/images/Product/".$row;exit;
          unlink("assets/images/Product/".$row);
        }
        
        //echo $this->db->last_query();
        if ($result) {
          $data['status'] = 'success';
        }
        return  $data;
      }
      public function temp_images_upload()
      {
        $filename = $_FILES['file']['name'];
        $i = 0;
        foreach ($_FILES['file']['tmp_name'] as $value) {
          $a = rand(1, 8953) . $filename[$i];
          if (move_uploaded_file($value, "assets/images/temp/" . str_replace(array('[\', \']', "(", ")", " "), '', $a))) {

            $file_name[] = $a;
          } else {
            echo 'error';
            exit;
          }
        }
        $i++;
        print_r(json_encode($file_name));
      }
      public function add_product()
      {
        if ($_FILES['file']['size'] > 0) {
          $config['upload_path'] = 'assets/images/Product';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['overwrite'] = false;
          $config['max_size']     = '1000';
          $this->load->library('upload', $config);
          if (!$this->upload->do_upload('file')) {
            $error = array('error' => $this->upload->display_errors());
          } else {
            $img_data = array('upload_data' => $this->upload->data());
            ///$fileExt = pathinfo($img_data, PATHINFO_EXTENSION);
            $data['image'] = $config['file_name'] . $this->upload->data('file_ext');
            //$this->db->insert("xx_product",$data);
            //$prod_id=$this->db->insert_id();
            foreach ($this->input->post('color') as $color) {
            }

            // foreach($this->input->post('measurement') as $key => $value){
            //   $uom = explode(" ", $value);
            //   $sizes=array("productId"=>$prod_id,"size"=>$uom[0],"uom"=>$key);
            //   $this->db->insert("xx_product_size",$sizes);
            //   //print_r($this->db->last_query());exit;

            // }//print_r($this->db->last_query());exit;

            header("Location: " . base_url('manage-products'));
          }
        }
      }
      public function getPrefixOfSubCategory($id)
      {
        $result = $this->db->select('prefix')->from("xx_sub_category")->where('subCategoryId', $id)->get()->row()->prefix;
        return $result;
      }
      public function getPrefixOfCategory($id)
      {

        $result = $this->db->select('prefix')->from("xx_category")->where('id', $id)->get()->row()->prefix;
        return $result;
      }
      public function getUpcomingInsertedProductUniqueId($str)
      {

        $result = $this->db->select("unique_id")->from("xx_product")->where("unique_id like", $str . "%")->order_by("id", "DESC")->limit(1)->get()->row();

        $val =  "000000" . (str_replace($str, '', $result->unique_id) + 1);
        return $str . substr($val, -5);
      }
      public function getUpcomingInsertedStockUniqueId($str)
      {

        $result = $this->db->select("stockUniqueId")->from("xx_stock")->where("stockUniqueId like", $str . "%")->order_by("id", "DESC")->limit(1)->get()->row();

        $val =  "000000" . (str_replace($str, '', $result->stockUniqueId) + 1);
        return $str . substr($val, -5);
      }
      public function add_new_product()
      {

        $this->session->userdata('orgid');
        $last_row=$this->db->select("createdDate")->from("xx_product")
        ->where("orgId",$this->session->userdata('orgId'))
        ->limit(1)->order_by("createdDate","DESC")->get()->row();
        $date = date('Y-m-y h:i:s');

        $diff = abs(strtotime($date) - strtotime($last_row->createdDate));
        if($diff<10){
          return 0; 
        }
        $data['category_id'] = $this->input->post('cat');
        $data['sub_category_id'] = $this->input->post('sub_cat');
        $data['moq'] = $this->input->post('moq');
        $data['content'] = $this->input->post('content');
        $data['costing'] = $this->input->post('costing');
        $data['description'] = $this->input->post('description');
        $data['listing'] = $this->input->post('listing');
        if($this->session->userdata('is_verified')=="N"){
          $data['listing']="Private";
        }
        $data['teamview'] = $this->input->post('teamview');
        $data['orgId'] = $this->session->userdata('orgId');
        $data['createdBy'] = $this->session->userdata('user_id');
        $data['sku'] = $this->input->post('sku');
        $img_path = $this->input->post('img_arr');
        $cat_prefix = $this->getPrefixOfCategory($data['category_id']);
        $sub_cat_prefix = $this->getPrefixOfSubCategory($data['sub_category_id']);
        $data['unique_id'] = $this->getUpcomingInsertedProductUniqueId($cat_prefix . $sub_cat_prefix);
        $count = $this->input->post('count');
        for ($i = 1; $i < $count; $i++) {
          $image = $this->input->post('file' . $i);
          $extension_array = explode('/', (explode(';', $image))[0]);
          $extension = end($extension_array);
    
          $img = $image;
          if ($extension == 'png' || $extension == 'jpg' || $extension == 'jpeg') {
            $img = str_replace('data:image/' . $extension . ';base64,', '', $img);
          } elseif ($extension == 'mp4' || $extension == 'mov') {
            $img = str_replace('data:video/' . $extension . ';base64,', '', $img);
          }
          $img = str_replace(' ', '+', $img);
          $data1 = base64_decode($img);
          //$new_img = $data['unique_id'] . rand(1, 1987) . str_replace(array('[\', \']', "(", ")", " "), '', ($arr[count($arr) - 1]));
          $rand=rand(1, 1987);
          $file = "assets/images/Product/" . $data['unique_id'] . $rand .".".$extension;
          
          $success = file_put_contents($file, $data1);
          $path[] = $data['unique_id'] . $rand .".".$extension;
        }
        
        $string = '';
        $data['image'] = serialize($path);
        $data['cloud_path'] = $string;
        $result = $this->db->insert("xx_product", $data);
        $prod_id = $this->db->insert_id();       
        $colorSel = explode(",",$this->input->post('colorSel'));
        if ($result) {
          foreach (explode(",",$this->input->post('size_arr')) as  $value) {
            $temp_arr = explode(' ', $value, 2);
            $sizes = array("productId" => $prod_id,
                          "size" => (int)$value,
                           "uom" => $this->getUomIdByName($temp_arr[1]));
            $this->db->insert("xx_product_size", $sizes);
          }
          foreach ($colorSel as $color) {
            $ar = array('colorHexCode' => $color, 'productId ' => $prod_id, 'createdBy' => $this->session->userdata('user_id'));
            $this->db->insert("xx_product_color", $ar);
          }
        }
        //print_r($this->input->post());exit;
        
        echo $result;
      }
      public function edit_product($prod_id)
      {
        //ini_set("display_errors",1);
        //print_r($this->input->post());exit;
        $data['category_id'] = $this->input->post('cat');
        $data['sub_category_id'] = $this->input->post('sub_cat');
        $data['sub_category_id'] = $this->input->post('sub_cat');
        $data['moq'] = $this->input->post('moq');
        $data['content'] = $this->input->post('content');
        $data['costing'] = $this->input->post('costing');
        $data['description'] = $this->input->post('description');
        $data['listing'] = $this->input->post('listing');
        if($this->session->userdata('is_verified')=="N"){
          $data['listing']="Private";
        }
        $data['teamview'] = $this->input->post('teamview');
        $unique_idProd=$this->getProductUniqueById($prod_id);
        //$data['orgId'] = $this->session->userdata('user_id');
        $data['sku'] = $this->input->post('sku');
        if ($this->session->userdata('type') == "Super Admin") {
          if ($this->input->post('featured') == "Y") {
            $data['featured'] = "Y";
            $data['gold'] = "N";
          }
          if ($this->input->post('gold') == "Y") {
            $data['gold'] = "Y";
            $data['featured'] = "N";
          }
          $data['assured'] = $this->input->post('assured');
        }
        $img_path = $this->input->post('img_arr');
        //print_r($img_path[0]);exit;
        $count = $this->input->post('count');
        ///echo $count;
        for ($i = 1; $i < $count; $i++) {
          $image = $img_path[$i-1];
          $extension_array = explode('/', (explode(';', $image))[0]);
          $extension = end($extension_array);
    
          $img = $image;
          if ($extension == 'png' || $extension == 'jpg' || $extension == 'jpeg') {
            $img = str_replace('data:image/' . $extension . ';base64,', '', $img);
          } elseif ($extension == 'mp4' || $extension == 'mov') {
            $img = str_replace('data:video/' . $extension . ';base64,', '', $img);
          }
          $img = str_replace(' ', '+', $img);
          $data1 = base64_decode($img);
          //exit;
          //$new_img = $data['unique_id'] . rand(1, 1987) . str_replace(array('[\', \']', "(", ")", " "), '', ($arr[count($arr) - 1]));
          $rand=rand(1111, 9999);
          $file = "assets/images/Product/" . $unique_idProd . $rand .".".$extension;
          
          $success = file_put_contents($file, $data1);
          $path[] = $unique_idProd. $rand .".".$extension;
        }
        $data['image'] = serialize($path);
        $prod_img=$this->getProductImagesById($prod_id);
        foreach($prod_img as $row){
          //echo base_url()."assets/images/Product/".$row;exit;
          unlink("assets/images/Product/".$row);
        }
        $this->db->where('id', $prod_id);
        $result = $this->db->update("xx_product", $data);
        //echo $this->db->last_query()
        //ini_set("display_errors",1);
        $colorSel = $this->input->post('colorSel');
        if ($result) {

          $this->db->where("productId", $prod_id);
          $this->db->delete("xx_product_size");

          foreach ($this->input->post('size_arr') as  $value) {
            if ((int)$value) {
              //$value;
              $temp_arr = explode(' ', $value, 2);
              //print_r($array);exit;

              $sizes = array("productId" => $prod_id,
                             "size" => (int)$value,
                             "uom" => $this->getUomIdByName($temp_arr[1]));
              //print_r($sizes);exit;
              $this->db->insert("xx_product_size", $sizes);
              //print_r($value);
            }
          }

          $this->db->where("productId", $prod_id);
          $this->db->delete("xx_product_color");
          foreach ($colorSel as $color) {
            $ar = array('colorHexCode' => $color, 'productId ' => $prod_id, 'createdBy' => $this->session->userdata('user_id'));
            $this->db->insert("xx_product_color", $ar);
            //echo $this->db->last_query();exit;
          }
          $res['status']="ok";
          //print_r($res);
          return $res;
          //exit;
        }
      }
      public function getUomIdByName($name)
      {
        return $this->db->select("id")->from("xx_cat_uom")->where("name", $name)->get()->row()->id;
      }
      public function getColorByProductId()
      {
        $result = $this->db->select("Id,colorName")->from("xx_master_color")->where('categoryId', $this->input->post('cat_id'))
          ->where("deleted", "N")->get()->result_array();

        return $result;
      }

      public function getNoOfProduct($orgId)
      {
        //$result = $this->db->select("*")->from("xx_product")->where("createdBy", $user_id)->get()->num_rows();
        if ($this->session->userdata('type') == "Admin") {
          $usersOfOrg = $this->db->select("GROUP_CONCAT(id) as users")->from("xx_user")->where('orgId', $orgId)->get()->result_array()[0]['users'];

          $result = $this->db->select("*")->from("xx_product")->where("createdBy  in( " . $usersOfOrg . " )")->get()->num_rows();
        } else {
          $result = $this->db->select("*")->from("xx_product")->where("createdBy", $orgId)->get()->num_rows();
        }

        return $result;
      }

      public function getListedStockOrOrg($orgId)
      {
        //$result = $this->db->select("*")->from("xx_product")->where("createdBy", $user_id)->get()->num_rows();
        if ($this->session->userdata('type') == "Admin") {
          $usersOfOrg = $this->db->select("GROUP_CONCAT(id) as users")->from("xx_user")->where('orgId', $orgId)->get()->result_array()[0]['users'];
          $result = $this->db->select("*")->from("xx_stock")->where("createdBy  in( " . $usersOfOrg . " )")->get()->num_rows();
        }


        return $result;
      }

      public function getNoofProductShortlistedofOrg($orgId)
      {

        $usersOfOrg = $this->db->select("GROUP_CONCAT(id) as users")->from("xx_user")->where('orgId', $orgId)->get()->result_array()[0]['users'];

        $result = $this->db->select("distinct(pro_id)")->from("xx_shortlist_product")->where("user_id  in( " . $usersOfOrg . " )")->get()->num_rows;

        //echo $this->db->last_query();exit;
        return $result;
      }

      public function saveStock()
      {
        //echo "hi";
        //ini_set("display_errors",1);
        $cat_prefix = $this->getPrefixOfCategory($this->input->post('cat'));
        $sub_cat_prefix = $this->getPrefixOfSubCategory($this->input->post('sub_cat'));
        $data['categoryId'] = $this->input->post('cat');
        $data['subcategoryId'] = $this->input->post('sub_cat');
        $data['acticleNumber'] = $this->input->post('sku');
        $data['price'] = $this->input->post('price');
        $data['costing']=$this->input->post('costing');
        $data['currency'] = $this->Front_model->getCurrencyByid($this->input->post('currency'));
        $data['content'] = $this->input->post('content');
        $data['listing'] = $this->input->post('listing');
        $data['description'] = $this->input->post('description');
        $data['orgId'] = $this->session->userdata('orgId');
        $data['location'] = $this->input->post('stock_location');
        $data['createdBy'] = $this->session->userdata('user_id');
        $data['quantity'] = $this->input->post('sto_quant');
        $data['moq'] = $this->input->post('moq');
        $data['quantity_unit'] = $this->input->post('uom1');
        //echo "here";exit;
        $data['stockUniqueId'] = $this->getUpcomingInsertedStockUniqueId($cat_prefix . $sub_cat_prefix);
        if ($this->session->userdata('type') == "SowtexAdmin" || $this->session->userdata('type') == "Super Admin") {
          $data_enq['sowtexUserId'] = $this->session->userdata('user_id');
          //$data_enq['behalfofEnqiury']=$this->input->post('bahalf');
          $data['createdBy'] = $data['orgId'] = $this->Front_model->getOrgIdByOrgName($this->input->post('behalfOf'));
        }
        //print_r($data);exit;
        $colorSel = $this->input->post('colorSel');
        $result = $this->db->insert("xx_stock", $data);
        $stock_id = $this->db->insert_id();
        $count = $this->input->post('count');
        for ($i = 1; $i < $count; $i++) {
          $image = $this->input->post('file' . $i);
          $extension_array = explode('/', (explode(';', $image))[0]);
          $extension = end($extension_array);
      
          $img = $image;
          if ($extension == 'png' || $extension == 'jpg' || $extension == 'jpeg') {
            $img = str_replace('data:image/' . $extension . ';base64,', '', $img);
          } elseif ($extension == 'mp4' || $extension == 'mov') {
            $img = str_replace('data:video/' . $extension . ';base64,', '', $img);
          }
          $img = str_replace(' ', '+', $img);
          $data1 = base64_decode($img);
          //$new_img = $data['unique_id'] . rand(1, 1987) . str_replace(array('[\', \']', "(", ")", " "), '', ($arr[count($arr) - 1]));
          $rand=rand(1, 1987);
          $file = "assets/images/Stock/" . $data['stockUniqueId'] . $rand .".".$extension;
          
          $success = file_put_contents($file, $data1);
          //$path[] = $data['stockUniqueId'] . $rand .".".$extension;
          $stock_img['stockImage'] = $data['stockUniqueId'] . $rand .".".$extension;
          $stock_img['stockId'] = $stock_id;
          $stock_img['createdBy'] = $this->session->userdata('user_id');
          $stock_img['deleted'] = "N";
          $stock_img_res = $this->db->insert("xx_stock_image", $stock_img);
        }
        //echo $stock_id;
        if ($result) {
          foreach (explode(",", $this->input->post('size_arr')) as  $value) {
            //print_r($value);//exit;
            $sizes = array("stockId" => $stock_id, "sizeNumber" => (int)$value, "sizeUnit" => preg_replace('/[0-9]+/', '', $value));
            $this->db->insert("xx_stock_size", $sizes);
            //echo $this->db->last_query();//exit;
          }
          foreach (explode(",", $colorSel)   as $color) {
            $ar = array('colorCode' => $color, 'stockId ' => $stock_id, 'createdBy' => $this->session->userdata('user_id'));
            $this->db->insert("xx_stock_color", $ar);
            //echo $this->db->last_query();exit;
          }
          if ($result) {
                $res['status'] = 'success';
                $res['error'] = '';
                
                return $res;
              }
        }
        // $min_img_size = 20;
        // $max_img_size = 10000;
        // $min_img_height = 50;
        // $max_img_height = 2000;
        // $min_img_width = 60;
        // $max_img_width = 2200;
        // if ($result) {
        //   if ($_FILES['img']['size'] > 0) {
        //     $config['upload_path']   = './assets/images/Stock/';
        //     $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
        //     $config['max_size']      = $max_img_size;
        //     $config['min_size']      = $min_img_size;
        //     $config['min_width']     = $min_img_width;
        //     $config['min_height']    = $min_img_height;
        //     $config['max_width']     = $max_img_width;
        //     $config['max_height']    = $max_img_height;
        //     $new_name                   = $data['stockUniqueId'];
        //     $config['file_name']        = $new_name . rand(1111, 9999);
        //     $this->load->library('upload', $config, 'gst_upload');
        //     $this->gst_upload->initialize($config);
        //     if (!$this->gst_upload->do_upload('img')) {
        //       $error = array('error' => $this->gst_upload->display_errors());
        //       //print_r($error);
        //       $res['status'] = 'error';
        //       $res['error'] = $error;
        //       return $res;
        //       exit;
        //     } else {
        //       $img_status['first'] = "ok";
        //       $stock_img['stockImage'] = $config['file_name'] . $this->gst_upload->data('file_ext');
        //       $stock_img['stockId'] = $stock_id;
        //       $stock_img['createdBy'] = $this->session->userdata('user_id');
        //       $stock_img['deleted'] = "N";
        //       $stock_img_res = $this->db->insert("xx_stock_image", $stock_img);
        //       //echo $this->db->last_query();exit;
        //       // if($stock_img_res){
        //       //   $res['status']='success';
        //       //   $res['error']=''; 
        //       //   return $res;
        //       // }
        //     }
        //   }
        //   if ($_FILES['img1']['size'] > 0) {
        //     $config['upload_path']   = './assets/images/Stock/';
        //     $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
        //     $config['max_size']      = $max_img_size;
        //     $config['min_size']      = $min_img_size;
        //     $config['min_width']     = $min_img_width;
        //     $config['min_height']    = $min_img_height;
        //     $config['max_width']     = $max_img_width;
        //     $config['max_height']    = $max_img_height;
        //     $new_name1                   = $data['stockUniqueId'];
        //     $config['file_name']        = $new_name1 . rand(1111, 9999);
        //     $this->load->library('upload', $config, 'gst_upload');
        //     $this->gst_upload->initialize($config);
        //     if (!$this->gst_upload->do_upload('img1')) {
        //       $error = array('error' => $this->gst_upload->display_errors());
        //       //print_r($error);
        //       $res['status'] = 'error';
        //       $res['error'] = $error;
        //       return $res;
        //       exit;
        //     } else {
        //       $img_status['sec'] = "ok";
        //       $stock_img['stockImage'] = $config['file_name'] . $this->gst_upload->data('file_ext');
        //       $stock_img['stockId'] = $stock_id;
        //       $stock_img['createdBy'] = $this->session->userdata('user_id');
        //       $stock_img['deleted'] = "N";
        //       $stock_img_res = $this->db->insert("xx_stock_image", $stock_img);
        //       //echo $this->db->last_query();exit;
        //       // if($stock_img_res){
        //       //   $res['status']='success';
        //       //   $res['error']=''; 
        //       //   return $res;
        //       // }
        //     }
        //   }
        //   if ($_FILES['img2']['size'] > 0) {
        //     $config['upload_path']   = './assets/images/Stock/';
        //     $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
        //     $config['max_size']      = $max_img_size;
        //     $config['min_size']      = $min_img_size;
        //     $config['min_width']     = $min_img_width;
        //     $config['min_height']    = $min_img_height;
        //     $config['max_width']     = $max_img_width;
        //     $config['max_height']    = $max_img_height;
        //     $new_name2                   = $data['stockUniqueId'];
        //     $config['file_name']        = $new_name2 . rand(1111, 9999);
        //     $this->load->library('upload', $config, 'gst_upload');
        //     $this->gst_upload->initialize($config);
        //     if (!$this->gst_upload->do_upload('img2')) {
        //       $error = array('error' => $this->gst_upload->display_errors());
        //       //print_r($error);
        //       $res['status'] = 'error';
        //       $res['error'] = $error;
        //       return $res;
        //       exit;
        //     } else {
        //       $img_status['thr'] = "ok";
        //       $stock_img['stockImage'] = $config['file_name'] . $this->gst_upload->data('file_ext');
        //       $stock_img['stockId'] = $stock_id;
        //       $stock_img['createdBy'] = $this->session->userdata('user_id');
        //       $stock_img['deleted'] = "N";
        //       $stock_img_res = $this->db->insert("xx_stock_image", $stock_img);
        //       //echo $this->db->last_query();exit;
        //       // if($stock_img_res){
        //       //   $res['status']='success';
        //       //   $res['error']=''; 
        //       //   return $res;
        //       // }
        //     }
        //   }
        //   if ($stock_img_res) {
        //     $res['status'] = 'success';
        //     $res['error'] = '';
        //     $res['img'] = $img_status;
        //     return $res;
        //   }
        // }
      }

      public function deleteStock()
      {
        //ini_set("display_errors",1);
        $data['orgId'] = $this->input->post('orgId');
        //$data['createdBy']=$this->input->post('user_id');
        $this->db->where("id", $this->input->post('unique_id'));
        $result = $this->db->delete("xx_stock", $data);
        
        $del_color['stockId']=$this->input->post('unique_id');

        $this->db->where("stockId", $this->input->post('unique_id'));
        $del_color=$this->db->delete("xx_stock_color", $del_color);

        // deleting stock image
        
        $this->db->where("stockId", $this->input->post('unique_id'));
        $del_size['stockId']= $this->input->post('unique_id');
        $del_result = $this->db->delete("xx_stock_size", $del_size);
        //echo $this->db->last_query();;
        
        // delete images from folder 
        $stock_img = $this->db->select('stockImage as image')->from('xx_stock_image')
        ->where('stockId', $this->input->post('unique_id'))->get()->result_array();
        //echo $this->db->last_query();//exit;
        foreach($stock_img as $row){
          //echo "assets/images/stock/".$row['image'];exit;
          unlink("assets/images/Stock/".$row['image']);
        }

        // delete stock image from table
        $del_img['stockId']= $this->input->post('unique_id');
        $del_result = $this->db->delete("xx_stock_image", $del_img);

        if ($stock_img) {
          $data['status'] = 'succces';
          return $data;
        }
      }

      public function updateStock()
      {
        
        $data['categoryId'] = $this->input->post('cat');
        $data['subcategoryId'] = $this->input->post('sub_cat');
        $data['acticleNumber'] = $this->input->post('sku');
        $data['price'] = $this->input->post('price');
        $data['costing'] = $this->input->post('costing');
        $data['currency'] = $this->Front_model->getCurrencyByid($this->input->post('currency'));
        $data['content'] = $this->input->post('content');
        $data['listing'] = $this->input->post('listing');
        $data['description'] = $this->input->post('description');
        $data['orgId'] = $this->session->userdata('orgId');
        $data['location'] = $this->input->post('stock_location');
        $data['quantity'] = $this->input->post('sto_quant');
        $data['moq'] = $this->input->post('moq');
        $data['quantity_unit'] = $this->input->post('uom1');
        if ($this->session->userdata('type') == "SowtexAdmin" || $this->session->userdata('type') == "Super Admin") {
          $data['assured'] = $this->input->post('assured');
        }
      
        


        $data['updatedDate']=  date('Y-m-d h:i:s', time());
        $colorSel = $this->input->post('colorSel');
        $stock_id = $this->input->post('stock_id');
        //print_r($data);exit;
        $this->db->where('id', $this->input->post('stock_id'));
        $result = $this->db->update("xx_stock", $data);
        $stock_id = $this->input->post('stock_id');
        $del_data['stockId'] = $this->input->post('stock_id');


        // started deleting old stock data

        $del_color['stockId']=$this->input->post('stock_id');
        $this->db->where("stockId", $this->input->post('stock_id'));
        $del_color=$this->db->delete("xx_stock_color", $del_color);

        // deleting stock image
        
        $this->db->where("stockId", $this->input->post('stock_id'));
        $del_size['stockId']= $this->input->post('stock_id');
        $del_result = $this->db->delete("xx_stock_size", $del_size);
        //echo $this->db->last_query();;
        
        // delete images from folder 
        $stock_img = $this->db->select('stockImage as image')->from('xx_stock_image')
        ->where('stockId', $this->input->post('stock_id'))->get()->result_array();
        //echo $this->db->last_query();//exit;
        foreach($stock_img as $row){
          //echo "assets/images/stock/".$row['image'];exit;
          unlink("assets/images/Stock/".$row['image']);
        }

        // delete stock image from table
        $del_img['stockId']= $this->input->post('stock_id');
        $del_result = $this->db->delete("xx_stock_image", $del_img);

        // end old delete data of stock;
        //ini_set("display_errors",1);
      
        $sto_uniq_id = $this->db->select("stockUniqueId")->from("xx_stock")->where('id', $this->input->post('stock_id'))->get()->row()->stockUniqueId;
        
        $rand= rand(1111, 99999);
        $count = $this->input->post('count');
        $img_path = $this->input->post('img_arr');
       // print_r($img_path);exit;
        for ($i = 1; $i < $count; $i++) {
           $image = $img_path[$i-1];
        
          $extension_array = explode('/', (explode(';', $image))[0]);
          $extension = end($extension_array);
          //echo $image;exit;
          $img = $image;
          if ($extension == 'png' || $extension == 'jpg' || $extension == 'jpeg') {
            $img = str_replace('data:image/' . $extension . ';base64,', '', $img);
          } elseif ($extension == 'mp4' || $extension == 'mov') {
            $img = str_replace('data:video/' . $extension . ';base64,', '', $img);
          }
          $img = str_replace(' ', '+', $img);
          $data1 = base64_decode($img);
          //exit;
          //$new_img = $data['unique_id'] . rand(1, 1987) . str_replace(array('[\', \']', "(", ")", " "), '', ($arr[count($arr) - 1]));
          $rand=rand(1111, 9999);
          $file = "assets/images/Stock/" . $sto_uniq_id . $rand .".".$extension;
          
          $success = file_put_contents($file, $data1);

          //$path[] = $sto_uniq_id. $rand .".".$extension;
          //echo "here";exit;
          //$stock_img='';
          $stock_img1['stockImage']=$sto_uniq_id . $rand .".".$extension;
          $stock_img1['stockId'] = $this->input->post('stock_id');
          $stock_img1['createdBy'] = $this->session->userdata('user_id');
          $stock_img1['deleted'] = "N";
          $stock_img_res = $this->db->insert("xx_stock_image", $stock_img1);
         
        }
        //print_r($this->input->post('size_arr'));exit;
        $stock_id=$this->input->post('stock_id');
        if ($stock_img_res) {
          
          $del_color['stockId']=$this->input->post('stock_id');
          $this->db->where('stockId', $this->input->post('stock_id'));
          $this->db->delete("xx_stock_color",$del_color);
          $del_size['stockId']=$this->input->post('stock_id');
          $this->db->where('stockId', $this->input->post('stock_id'));
          $this->db->delete("xx_stock_size",$del_size);
          //print_r(explode(",",$this->input->post('size_arr')));exit;
          foreach ($this->input->post('size_arr') as   $value) {
            if ((int)$value == "0") {
              continue;
            }
            $sizes = array("stockId" => $stock_id, "sizeNumber" => (int)$value, "sizeUnit" => preg_replace('/[0-9]+/', '', $value));
            $this->db->insert("xx_stock_size", $sizes);
            //echo $this->db->last_query();//exit;
          }
          foreach ( $colorSel    as $color) {
            //print_r(explode(",",$colorSel));exit;


            $ar = array('colorCode' => $color, 'stockId ' => $stock_id, 'createdBy' => $this->session->userdata('user_id'));
            $this->db->insert("xx_stock_color", $ar);
            //echo $this->db->last_query();exit;
          }
        }
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        //echo $this->db->last_query();;
       // $data['stockUniqueId'] = $this->db->select("stockUniqueId")->from("xx_stock")->where('id', $stock_id)->get()->row()->stockUniqueId;
        if ($result) {
          // if ($_FILES['img']['size'] > 0) {
          //   $this->db->where('stockId', $this->input->post('stock_id'));
          //   $del_old_stock = $this->db->delete("xx_stock_image", $del_data);
          //   $config['upload_path']   = './assets/images/Stock/';
          //   $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          //   $config['max_size']      = $max_img_size;
          //   $config['min_size']      = $min_img_size;
          //   $config['min_width']     = $min_img_width;
          //   $config['min_height']    = $min_img_height;
          //   $config['max_width']     = $max_img_width;
          //   $config['max_height']    = $max_img_height;
          //   $new_name                   = $data['stockUniqueId'];
          //   $config['file_name']        = $new_name . rand(1111, 9999);
          //   $this->load->library('upload', $config, 'gst_upload');
          //   $this->gst_upload->initialize($config);
          //   if (!$this->gst_upload->do_upload('img')) {
          //     $error = array('error' => $this->gst_upload->display_errors());
          //     //print_r($error);
          //     $res['status'] = 'error';
          //     $res['error'] = $error;
          //     return $res;
          //     exit;
          //   } else {
          //     $img_status['first'] = "ok";
          //     $stock_img['stockImage'] = $config['file_name'] . $this->gst_upload->data('file_ext');
          //     $stock_img['stockId'] = $stock_id;
          //     $stock_img['createdBy'] = $this->session->userdata('user_id');
          //     $stock_img['deleted'] = "N";
          //     $stock_img_res = $this->db->insert("xx_stock_image", $stock_img);
          //     //echo $this->db->last_query();//exit;
          //     // if($stock_img_res){
          //     //   $res['status']='success';
          //     //   $res['error']=''; 
          //     //   return $res;
          //     // }
          //   }
          // }
          // if ($_FILES['img1']['size'] > 0) {
          //   $config['upload_path']   = './assets/images/Stock/';
          //   $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          //   $config['max_size']      = $max_img_size;
          //   $config['min_size']      = $min_img_size;
          //   $config['min_width']     = $min_img_width;
          //   $config['min_height']    = $min_img_height;
          //   $config['max_width']     = $max_img_width;
          //   $config['max_height']    = $max_img_height;
          //   $new_name1                   = $data['stockUniqueId'];
          //   $config['file_name']        = $new_name1 . rand(1111, 9999);
          //   $this->load->library('upload', $config, 'gst_upload');
          //   $this->gst_upload->initialize($config);
          //   if (!$this->gst_upload->do_upload('img1')) {
          //     $error = array('error' => $this->gst_upload->display_errors());
          //     //print_r($error);
          //     $res['status'] = 'error';
          //     $res['error'] = $error;
          //     return $res;
          //     exit;
          //   } else {
          //     $img_status['sec'] = "ok";
          //     $stock_img['stockImage'] = $config['file_name'] . $this->gst_upload->data('file_ext');
          //     $stock_img['stockId'] = $stock_id;
          //     $stock_img['createdBy'] = $this->session->userdata('user_id');
          //     $stock_img['deleted'] = "N";
          //     $stock_img_res = $this->db->insert("xx_stock_image", $stock_img);
          //     //echo $this->db->last_query();//;exit;
          //     // if($stock_img_res){
          //     //   $res['status']='success';
          //     //   $res['error']=''; 
          //     //   return $res;
          //     // }
          //   }
          // }
          // if ($_FILES['img2']['size'] > 0) {
          //   $config['upload_path']   = './assets/images/Stock/';
          //   $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          //   $config['max_size']      = $max_img_size;
          //   $config['min_size']      = $min_img_size;
          //   $config['min_width']     = $min_img_width;
          //   $config['min_height']    = $min_img_height;
          //   $config['max_width']     = $max_img_width;
          //   $config['max_height']    = $max_img_height;
          //   $new_name2                   = $data['stockUniqueId'];
          //   $config['file_name']        = $new_name2 . rand(1111, 9999);
          //   $this->load->library('upload', $config, 'gst_upload');
          //   $this->gst_upload->initialize($config);
          //   if (!$this->gst_upload->do_upload('img2')) {
          //     $error = array('error' => $this->gst_upload->display_errors());
          //     //print_r($error);
          //     $res['status'] = 'error';
          //     $res['error'] = $error;
          //     return $res;
          //     exit;
          //   } else {
          //     $img_status['thr'] = "ok";
          //     $stock_img['stockImage'] = $config['file_name'] . $this->gst_upload->data('file_ext');
          //     $stock_img['stockId'] = $stock_id;
          //     $stock_img['createdBy'] = $this->session->userdata('user_id');
          //     $stock_img['deleted'] = "N";
          //     $stock_img_res = $this->db->insert("xx_stock_image", $stock_img);
          //     //echo $this->db->last_query();//exit;
          //     // if($stock_img_res){
          //     //   $res['status']='success';
          //     //   $res['error']=''; 
          //     //   return $res;
          //     // }
          //   }
          // }

          if ($result) {
            $res['status'] = 'success';
            $res['error'] = '';
            //$res['img'] = $img_status;
            return $res;
          }
        }
      }

      public function shortlistedStock($user_id)
      {

        $this->db->select('xx_stock.*');
        $this->db->from('xx_stock');
        $this->db->join('xx_cartstock', 'xx_cartstock.stockId  = xx_stock.id');
        $this->db->where('xx_cartstock.createdBy', $this->session->userdata('user_id'));
        $data = $this->db->get()->result_array();
        foreach ($data as $result) {
          $res[$result['id']]['id'] = $result['id'];
          $res[$result['id']]['cat_name'] = $this->Front_model->getCategoryNameById($result['categoryId']);
          $res[$result['id']]['sub_cat_name'] = $this->Front_model->getSubCategoryNameById($result['subcategoryId']);
          $res[$result['id']]['listing'] = $result['listing'];
          $res[$result['id']]['views'] = rand(333, 5000);
          $color = $this->db->select('colorHexCode as color')->from('xx_product_color')->where('productid', $result['id'])->get()->result_array();
          $res[$result['id']]['unique_id'] = $result['stockUniqueId'];
          $res[$result['id']]['image'] = $this->getStockImagesbyId($result['id']);
          $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();
          $size_str = '';

          foreach ($data as $key => $value) {
            $size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
          }
          $res[$result['id']]['size'] = rtrim($size_str, ", ");
          $color_str = '';
          foreach ($color as $key => $value) {
            $color_str .= $value['color'] . ", ";
          }

          $res[$result['id']]['color'] = rtrim($color_str, ", ");
        }
        //print_r($res);exit;
        return $res;
      }
      public function shortlistStock()
      {
        $data['stockId'] = $this->input->post('stock_id');
        $data['createdBy'] = $this->input->post('user_id');
        //$data['org_id'] = $this->input->post('orgId');
        $result = $this->db->insert("xx_cartstock", $data);
        if ($result) {
          $res['status'] = "success";
          return $res;
        }
      }
      public function getAcceptedLeadofOrg($orgId)
      {

        $usersOfOrg = $this->db->select("GROUP_CONCAT(id) as users")->from("xx_user")->where('orgId', $orgId)->get()->result_array()[0]['users'];

        $already_accepted = $this->db->select("GROUP_CONCAT(enquiryId) as string")->from("xx_enquiry_accepted")->where("createdBy  in( " . $usersOfOrg . " )")->get()->row()->string;
        //echo $already_accepted;exit;

        return $already_accepted;
        //print_r($already_accepted);exit;

      }
      public function getAcceptedLeadofUser($id)
      {
        $result = $this->db->select("GROUP_CONCAT(enquiryId,' ') as string")->from("xx_enquiry_accepted")->where('createdBy', $id)->get()->row()->string;

        return $result;
      }
      public function getAcceptedLeadOnProductsofOrg($org)
      { 
        if ($this->session->userdata('type') == "Admin") {
          $result = $this->db->select("GROUP_CONCAT(`id`,' ') as ids")->from("xx_product")->where("orgId", $this->session->userdata("orgId"))->get()->row();
         
          if($result->ids==''){$result->ids=0;}
          $usersOfOrg = $this->db->select("GROUP_CONCAT(id, ' ') as users")->from("xx_user")->where('orgId', $this->session->userdata('orgId'))->get()->result_array()[0]['users'];
        }
        $this->db->select('xx_product.id,xx_enquiry.productId,xx_enquiry_accepted.createdBy');
        $this->db->from('xx_product');
        $this->db->join('xx_enquiry', 'xx_enquiry.productId   = xx_product.id');
        $this->db->join('xx_enquiry_accepted', 'xx_enquiry.id   = xx_enquiry_accepted.enquiryId');
        $this->db->join('xx_organisation', 'xx_product.orgId   = xx_organisation.orgId');
        $this->db->where("xx_organisation.orgId", 420);
        //$this->db->where("xx_enquiry_accepted.acctepted", "Y");
        $this->db->where("xx_enquiry.deleted", "N");
        $this->db->where("xx_product.id in (" . $result->ids . ")");
        $this->db->where("xx_enquiry_accepted.createdBy  in (" . $usersOfOrg . ")");
        $result = $this->db->get()->num_rows();
        //print_r($result);exit;
        return $result;
      }
      public function getRejectedLeadOnProductsofOrg()
      {
        if ($this->session->userdata('type') == "Admin") {
          $result = $this->db->select("GROUP_CONCAT(`id`,' ') as ids")->from("xx_product")->where("orgId", $this->session->userdata("orgId"))->get()->row();
          if($result->ids==''){$result->ids=0;}
          $usersOfOrg = $this->db->select("GROUP_CONCAT(id, ' ') as users")->from("xx_user")->where('orgId', $this->session->userdata('orgId'))->get()->result_array()[0]['users'];
        }
        $this->db->select('xx_product.id,xx_enquiry.productId,xx_enquiry_accepted.createdBy');
        $this->db->from('xx_product');
        $this->db->join('xx_enquiry', 'xx_enquiry.productId   = xx_product.id');
        $this->db->join('xx_enquiry_accepted', 'xx_enquiry.id   = xx_enquiry_accepted.enquiryId');
        $this->db->join('xx_organisation', 'xx_product.orgId   = xx_organisation.orgId');
        $this->db->where("xx_organisation.orgId", 420);
        $this->db->where("xx_enquiry_accepted.acctepted", "N");
        $this->db->where("xx_enquiry.deleted", "N");
        $this->db->where("xx_product.id in (" . $result->ids . ")");
        $this->db->where("xx_enquiry_accepted.createdBy  in (" . $usersOfOrg . ")");
        $result = $this->db->get()->num_rows();
        return $result;
      }
      public function getLeadOnMyProducts()
      {
        $final_arr['accepted'] = $this->getAcceptedLeadOnProductsofOrg($this->session->userdata("orgId"));
        $final_arr['rejected'] = $this->getRejectedLeadOnProductsofOrg($this->session->userdata("orgId"));
        $result = $this->db->select("GROUP_CONCAT(`id`,' ') as ids")->from("xx_product")
        ->where("orgId", $this->session->userdata("orgId"))->get()->row();
        // echo $this->db->last_query();exit;
        //print_r($result);exit;
        if ($result->ids && $this->session->userdata('dnd') == "Y" && count($result) > 0) {
          $usersOfOrg = $this->db->select("GROUP_CONCAT(id, ' ') as users")->from("xx_user")->where('orgId', $this->session->userdata('orgId'))->get()->result_array()[0]['users'];
          $where = "createdBy NOT IN ($usersOfOrg)";
          $accepted = $this->getAcceptedLeadofOrg($this->session->userdata('orgId'));
          $where_accepted_lead = " id Not IN (" . $accepted . ")";
          $this->db->select("*")->from("xx_enquiry")->where("productId  in(" . $result->ids . ")");
          $this->db->where($where);
          if ($accepted != '') {
            $this->db->where($where_accepted_lead);
          }
          $this->db->where("deleted", "N");
          $leads = $this->db->where("orgId <>", $this->session->userdata("orgId"))
          ->order_by("createdDate", "DESC")->get()->result_array();
          foreach ($leads as $row) {
            $data['cat'] = $this->Front_model->getCategoryNameById($row['categoryId']);
            $data['sub_cat'] = $this->Front_model->getSubCategoryNameById($row['subCategoryId']);
            $data['orgName'] = $this->Front_model->getOrgNameByOrgId($row['orgId']);
            $data['email'] = $this->Front_model->getOrgnizationUserEmailByOrgId($row['orgId']);
            $data['mobile'] = $this->Front_model->getOrgnizationUserMobileByOrgId($row['orgId']);
            $data['country'] = $this->Front_model->getOrgUserLocationById($row['orgId']);
            $location = '';
            if (strpos($row['enqCountry'], ',') !== false) {
              foreach (explode(",", $row['enqCountry']) as $id) {
                $location .= $this->Front_model->getCountryNameByid($id) . ", ";
              }
              $data['pref_location'] = rtrim($location, ", ");
            } else {
              $data['pref_location'] = $this->Front_model->getCountryNameByid($row['enqCountry']);
            } //exit;
            if ($row['productId']) {
              $data['enq_type'] = "To Product";
            } else {
              $data['enq_type'] = "To All";
            }
            $data['res_time'] = $row['responceTime'];
            //$data['owner'] = $this->Front_model->getUserNameById($row['sowtexUserId']);
            $data['owner'] = $this->Front_model->getEnquiryOwnerByUserId($row['createdBy']);
            $data['date'] = substr($row['createdDate'], 0, 10);
            $data['uniqe_id'] = $row['enquiryUniqueId'];
            $data['id'] = $row['id'];
            $data['status'] = $row['status'];
            $data['min'] = $row['minimumQuantity'];
            $data['behalf'] = $row['behalfofEnqiury'];
            $data1[] = $data;
          }
          $final_arr['data'] = $data1;
          //echo "<pre>";print_r($final_arr);exit;
          return $final_arr;
        }
      }

      // public function getStockDetailByUniqueId($unique_id){
      //     $result=$this->db->select("*")->from("xx_stock")->where("stockUniqueId",$unique_id)->get()->result_array();
      //     print_r($result);
      // }

      function getFeaturedProducts()
      {
        $rows = $this->db->select("*")->from("xx_product")->where("featured", "Y")->order_by("id", "desc")->limit(10)->get()->result_array();
        foreach ($rows as $row) {
          $data['pro_code'] = $row['unique_id'];
          $data['cat'] = $this->Front_model->getCategoryNameById($row['category_id']);
          $data['sub_cat'] = $this->Front_model->getSubCategoryNameById($row['category_id']);
          $data['org'] = $this->Front_model->getOrgnizationsNameByOrgId($row['orgId']);
          $data['loc'] = $this->Front_model->getOrgnizationsCountrybyId($row['orgId']);
          $data['id'] = $row['id'];
          $data['listing'] = $row['listing'];
          $data['img'] = unserialize($row['image']);
          $data['view'] = rand(200, 5000);
          $final_data[] = $data;
        }
        $data['com_count'] =  $org_count = $this->db->select("count(distinct(orgId)) as num")->from("xx_product")->where("featured", "Y")->get()->row()->num;
        //echo $this->db->last_query();exit;
        $result['countfeature'] = count($rows);
        $result['products'] = $final_data;
        return $result;
      }

      public function getAllProductsForSuperAdmin()
      {
        $rows = $this->db->select("*")->from("xx_product")->order_by("id", "desc")->limit(10)->get()->result_array();
        foreach ($rows as $row) {
          $data['pro_code'] = $row['unique_id'];
          $data['cat'] = $this->Front_model->getCategoryNameById($row['category_id']);
          $data['sub_cat'] = $this->Front_model->getSubCategoryNameById($row['sub_category_id']);
          $data['org'] = $this->Front_model->getOrgnizationsNameByOrgId($row['orgId']);
          $data['loc'] = $this->Front_model->getCountryNameByid($this->Front_model->getOrgnizationsCountrybyId($row['orgId']));
          $data['id'] = $row['id'];
          $data['featured'] = $row['featured'];
          $data['gold'] = $row['gold'];
          $data['listing'] = $row['listing'];
          $data['img'] = unserialize($row['image']);
          $data['view'] = rand(200, 5000);
          $final_data[] = $data;
        }
        //echo "<pre>";print_r($final_data);exit;
        return $final_data;
      }
      public function getAllProductsForSuperAdminBySearch()
      {
        $cat = $this->input->post('cat_id');
        $this->db->select('xx_product.image,xx_product.id,xx_product.category_id,xx_product.sub_category_id,xx_product.listing,xx_product.unique_id,xx_product.featured,xx_product.gold,xx_organisation.countryId,xx_organisation.orgId');
        $this->db->from('xx_product');
        $this->db->join('xx_organisation', 'xx_product.orgId  = xx_organisation.orgId');
        $this->db->join('xx_org_category', 'xx_org_category.orgId  = xx_organisation.orgId');
        $this->db->where("xx_product.category_id ", $this->input->post('cat_id'));
        $this->db->where("xx_product.sub_category_id ", $this->input->post('sub_cat_id'));
        if ($this->input->post('comp_id')) {
          $this->db->where("xx_organisation.orgId", $this->input->post('comp_id'));
        }
        //$this->db->where("xx_product.featured","Y");
        $this->db->where("xx_organisation.countryId", $this->input->post('loc'))->order_by("xx_product.createdDate", "DESC");
        $this->db->like("xx_org_category.sellCategory",  '"' . $cat . '"')->limit(20, $this->input->post('start'));
        $this->db->group_by("xx_product.id");
        $result = $this->db->get()->result_array();
        //echo $this->db->last_query();exit;
        $cat_color = $this->getColorByCategoryId($cat);
        foreach ($result as $row) {
          $data['id'] = $row['id'];
          $data['unique_id'] = $row['unique_id'];
          $data['cat'] = $this->Front_model->getCategoryNameById($row['category_id']);
          $data['sub_cat'] = $this->Front_model->getSubCategoryNameById($row['sub_category_id']);
          $data['listing'] = $row['listing'];
          $data['org'] = $this->Front_model->getOrgnizationsNameByOrgId($row['orgId']);
          $data['loc'] = $this->Front_model->getCountryNameByid($row['countryId']);
          $image[$row['id']] = unserialize($row['image']);
          $data['featured'] = $row['featured'];
          $data['gold'] = $row['gold'];
          $data['view'] = rand(200, 5000);
          $final_data[] = $data;
        }
        $arr['image'] = $image;
        //print_r($arr);exit;
        $arr['data'] = $final_data;

        $arr['colors'] = $cat_color;
        $arr['start'] = $this->input->post('start') + 20;

        return $arr;
      }
      public function viewProductDetailForSuperAdmin($pro_id)
      {
        $rows = $this->db->select("*")->from("xx_product")->where("id", $pro_id)->get()->result_array();
        //echo $this->db->last_query();
        foreach ($rows as $row) {
          $data['pro_code'] = $row['unique_id'];
          $data['cat'] = $this->Front_model->getCategoryNameById($row['category_id']);
          $data['sub_cat'] = $this->Front_model->getSubCategoryNameById($row['sub_category_id']);
          $data['org'] = $this->Front_model->getOrgnizationsNameByOrgId($row['orgId']);
          $data['countryId'] = $this->Front_model->getOrgnizationsCountrybyId($row['orgId']);
          $data['emps'] = $this->Front_model->getOrgnizationsNoOfEmp($row['orgId']);
          $data['est_year'] = $this->Front_model->getOrgnizationsYearOfEst($row['orgId']);
          $data['memberShip'] = $this->Front_model->getOrgMembershipbyOrgId($row['orgId']);
          $data['stateId'] = $this->Front_model->getOrgStatebyId($row['orgId']);
          $data['logo'] = $this->Front_model->getOrgLogoId($row['orgId']);
          //echo $row['orgId'];exit;
          $data['id'] = $row['id'];
          $data['listing'] = $row['listing'];
          $data['unique_id'] = $row['unique_id'];
          $data['sku'] = $row['sku'];
          $data['img'] = unserialize($row['image']);
          $data['moq'] = $row['moq'];
          $data['description'] = $row['description'];
          $data['view'] = rand(200, 5000);
          $nsize = $size = $sizes = $uom = $uom_name = [];
          $data_size = $this->db->select('size,uom')->from('xx_product_size')->where('productid', $row['id'])->get()->result_array();

          foreach ($data_size as $key => $value) {
            $sizes[] = $value['size'];
            $uom[] = $value['uom'];
          }
          $data_uom = $this->db->select("name")->from("xx_cat_uom")->where("id IN (" . implode(',', $uom) . ")")->get()->result_array();
          foreach ($data_uom as $key => $value) {
            $uom_name[] = $value['name'];
          }
          $a = '';
          foreach ($sizes as $size) {
            $a .= $size . " " . $value['name'] . ", ";
          }

          $data['sizes'] = $a;
          foreach ($this->getProductColorById($row['id']) as  $row) {
            $prod_color[] = $row['color'];
          };
          $data['prod_col'] = $prod_color;
        }
        //echo "<pre>";print_r($data);exit;
        return $data;
      }
      public function insertDataTbl_productToXX_product()
      {
        //$result=$this->db->select("*")->from("tbl_product")->get()->result_array();
        $this->db->select("distinct(tbl_product.productId),GROUP_CONCAT(tbl_product_image.image,', ') as image");
        $this->db->from('tbl_product');
        $this->db->join('tbl_product_image', 'tbl_product.productId   = tbl_product_image.productId')->group_by("tbl_product.productId");
        $result = $this->db->get()->result_array();
        //echo $this->db->last_query();exit;
        $count = 1;
        foreach ($result as $row) {

          $array = explode(",", rtrim(str_replace(", ,", ",", $row['image']), ", "));
          // print_r($array);//exit;
          // echo "<br>";

          // print_r($row);
          $data['image'] = serialize($array);
          //$data['id']=$row['productId'];
          $this->db->where("id", $row['productId']);
          $this->db->update("xx_product", $data);
          // echo $this->db->last_query();
          // exit;
          $count++;
        }
        echo $count;
      }
      public function manageAdminStockFilter()
      {
        //ini_set("display_errors",1);
        $this->db->select("xx_stock.*,xx_stock_image.stockImage")->from("xx_stock");
        $this->db->join('xx_stock_image', 'xx_stock.id   = xx_stock_image.stockId');
        ///$this->db->where
        if ($this->input->post('cat')) {
          $this->db->where('xx_stock.categoryId', $this->input->post('cat'));
        }
        if ($this->input->post('sub_cat')  && $this->input->post('sub_cat') != "Select") {
          $this->db->where('xx_stock.subcategoryId', $this->input->post('sub_cat'));
        }
        if ($this->input->post('searchText')) {
          $this->db->group_start();
          $this->db->where("xx_stock.content like ", "%" . $this->input->post('searchText') . "%");
          $this->db->or_where("xx_stock.stockUniqueId like ", "%" . $this->input->post('searchText') . "%");
          $this->db->group_end();
        }
        $this->db->where("xx_stock.deleted", "N");
        $data = $this->db->order_by("createdDate", "DESC")->limit(50)->get()->result_array();
        //print_r($this->db->last_query());exit;
        foreach ($data as $key => $result) {
          $result1[$result['id']]['id'] = $result['id'];
          $result1[$result['id']]['city'] = $result['location'];
          $result1[$result['id']]['unique_id'] = $result['stockUniqueId'];
          $result1[$result['id']]['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['categoryId'])->get()->row_array()['category'];
          $result1[$result['id']]['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subcategoryId', $result['subcategoryId'])->get()->row_array()['subCategoryName'];
          $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();
          $size_str = '';
          $color_str = '';
          foreach ($data as $key => $value) {
            $size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
          }
          $color = $this->db->select('colorCode as color')->from('xx_stock_color')->where('stockid', $result['id'])->get()->result_array();
          $img = $this->db->select('stockImage as image')->from('xx_stock_image')->where('stockId', $result['id'])->get()->result_array();
          foreach ($color as $key => $value) {
            $color_str .= $value['color'] . ", ";
          }
          $result1[$result['id']]['assured'] = $result['assured'];
          if ($img == '') {
            unset($result1[$result['id']]);
            continue;
          }
          $result1[$result['id']]['image'] = $img;
          $result1[$result['id']]['orgId'] = $result['orgId'];

          $result1[$result['id']]['color'] = rtrim($color_str, ", ");
          $result1[$result['id']]['sizes'] = rtrim($size_str, ", ");
          $result1[$result['id']]['listing'] = $result['listing'];
        }
        //print_r($result1);exit;
        return $result1;
      }
      public function getSellingCategoryOfOrg($orgId)
      {
        $sel_cat = $this->db->select("sellCategory")->from("xx_org_category")->where('sellCategory<>', '')->where("orgId", $orgId)->get()->row()->sellCategory;
        //echo $this->db->last_query();exit;
        return $sel_cat;
      }
      public function addProductInCatalogue()
      {
        //print_r($this->input->post());exit;
        if ($this->input->post('cat') == "Stock" || $this->input->post('cat') == "Shortlist Stock") {
          $rows = $this->db->select("*")->from("xx_stock")->where(" id in (" . $this->input->post('products') . ")")->get()->result_array();
          foreach ($rows as $result) {
            //ini_set("display_errors",1);
            $data = array();
            $data['catalogueId'] = $this->input->post('id');
            $data['productId'] = $result['id'];
            $data['type'] = "S";
            $data['createdBy'] = $this->session->userdata('user_id');
            //print_r($data);exit;
            $this->db->insert("xx_catalogue_product", $data);
            //echo $this->db->last_query();exit;
            //$this->db->select("*")->from("xx_stock")->where()
            $result1[$result['id']]['id'] = $result['id'];
            $result1[$result['id']]['cat_name'] = $this->Front_model->getCategoryNameById($result['categoryId']);
            $result1[$result['id']]['sub_cat_name'] = $this->Front_model->getSubCategoryNameById($result['subcategoryId']);
            $result1[$result['id']]['listing'] = $result['listing'];
            $result1[$result['id']]['views'] = rand(333, 5000);
            $color = $this->db->select('colorHexCode as color')->from('xx_product_color')->where('productid', $result['id'])->get()->result_array();
            $result1[$result['id']]['unique_id'] = $result['stockUniqueId'];
            $result1[$result['id']]['image'][0] = $this->getStockImagesbyId($result['id'])[0]['image'];
            $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();
            $size_str = '';

            foreach ($data as $key => $value) {
              $size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
            }
            $result1[$result['id']]['size'] = rtrim($size_str, ", ");
            $color_str = '';
            foreach ($color as $key => $value) {
              $color_str .= $value['color'] . ", ";
            }
            //print_r($result1);exit;
            $result1[$result['id']]['color'] = rtrim($color_str, ", ");
          }
        } else {
          foreach (explode(",", $this->input->post('products')) as $pro) {
            $data['catalogueId'] = $this->input->post('id');
            $data['productId'] = $pro;
            $data['type'] = "P";
            $data['createdBy'] = $this->session->userdata('user_id');
            $this->db->insert("xx_catalogue_product", $data);
            $result = $this->db->select("*")->from("xx_product")->where("id", $pro)->get()->result_array()[0];
            $result1[$result['id']]['id'] = $result['id'];
            $result1[$result['id']]['listing'] = $result['listing'];
            $result1[$result['id']]['unique_id'] = $result['unique_id'];
            $result1[$result['id']]['image'] = unserialize($result['image']);
            $result1[$result['id']]['cat'] = $this->Front_model->getCategoryNameById($result['category_id']);
            $result1[$result['id']]['sub'] = $this->Front_model->getSubCategoryNameById($result['sub_category_id']);
            $prod_color = "";
            unset($prod_color);
            foreach ($this->getProductColorById($result['id']) as  $row) {
              $prod_color .= $row['color'] . ", ";
            };
            $a = '';
            $sizes = $this->Front_model->getProductSizeById($result['id']);
            foreach ($sizes as $key => $value) {
              $a .= $value['size'] . ", ";
            }
            $result1[$result['id']]['size'] = rtrim($a, ", ");
            $result1[$result['id']]['color'] = $prod_color;

            $result1[$result['id']]['des'] = $result['description'];
            $result1[$result['id']]['md'] = $result['moq'];
            $result1[$result['id']]['content'] = $result['content'];
          }
        }
        //print_r($res);exit;
        $this->db->where('id', $this->input->post('id'));
        $cat_data['pageLayoutImage'] = count(explode(",", $this->input->post('products')));
        $this->db->update("xx_catalogue_master", $cat_data);


        //print_r($result1);exit;
        $cat_data = $this->db->select("*")->from("xx_catalogue_master")->where('id', $this->input->post('id'))->get()->row();
        $first_page_img = base_url('assets/images/catalog/frontPage/') . $cat_data->frontPageImage;
        $folder = "Product/";
        if ($this->input->post('cat') == "Stock" || $this->input->post('cat') == "Shortlist Stock") {
          $folder = "stock/";
        }
        if ($this->session->userdata('cat_row') == 2) {
          $content = '<br/><style>#product_tbl td{text-align:left; width:300px;}</style> 
          <table  style="width:700px;text-align:center;margin-left:20px;" >
          <tr><td>&nbsp;</td><td></td></tr><tr>';
          $count = 0;
          foreach ($result1 as $row) {
            $a = base_url('assets/images/product/') . $row['image'][0];
            $content .= '<td width="300">
                    <table style="background-color: #eaeaea;opacity: 0.5;margin-bottom:30px;" id="product_tbl" ><tr style="text-align:left" >
                    <td> <img src="' . base_url('assets/images/') . $folder . $row['image'][0] . '"
                    height="150" width="300">
                    </td> </tr>
                  <tr>
                    <td>Product Code: ' . $row['unique_id'] . '</td>
                  </tr>
                  <tr>
                    <td>Category: ' . $row['cat'] . '</td>
                  </tr>
                  
                  <tr>
                    <td>Sub Category: ' . $row['sub'] . '</td>
                  </tr>
                  <tr>
                    <td>Color: ' . rtrim($row['color'], ", ") . '</td>
                  </tr>
                  <tr>
                    <td>Content: ' . $row['content'] . '</td>
                    <tr>
                      <td>Sizes: ' . $row['size'] . '</td>
                    </tr>
                  </tr>
                </table>
                </td>';
            $count++;
            if ($count % 2 == 0) {
              $content .= '</tr><tr>';
            }
            if ($count % 6 == 0) {
              $content .= '</tr></table><style>#product_tbl td{text-align:left; width:300px;}</style> &nbsp;<br>&nbsp;
              <table style="width:700px;text-align:center;margin-left:20px;margin-top:40px;" > 
              <tr><td>&nbsp;</td><td>&nbsp;<br /> </td></tr><tr>';
            }
          }
          $content .= '</tr></table>';
        } else {
          $content = '<br/><style>#product_tbl td{text-align:left; width:300px;}</style> 
          <table  style="width:700px;text-align:center;margin-left:20px;" broder="1">
          <tr><td>&nbsp;</td><td></td></tr><tr>';
          foreach ($result1 as $row) {
            $content .= '<tr><td>';
            $content .= '
            <img src="' . base_url('assets/images/') . $folder . $row['image'][0] . '"
            height="150" width="300"></td><td>
            <table style="background-color: #eaeaea;opacity: 0.5;margin-bottom:30px;" id="product_tbl" ><tr style="text-align:left" >
            <td> 
            </td> </tr>
          <tr>
            <td>Product Code: ' . $row['unique_id'] . '</td>
          </tr>
          <tr>
            <td>Category: ' . $row['cat'] . '</td>
          </tr>
          
          <tr>
            <td>Sub Category: ' . $row['sub'] . '</td>
          </tr>
          <tr>
            <td>Color: ' . rtrim($row['color'], ", ") . '</td>
          </tr>
          <tr>
            <td>Content: ' . $row['content'] . '</td>
            <tr>
              <td>Sizes: ' . rtrim($row['size'], ", ") . '</td>
            </tr>
          </tr>
          
        </table>';
            $content .= '</td> </tr><tr><td height="10">&nbsp;</td></tr>';
          }
          $content .= '</table>';
        }

        //echo $content;exit;
        require_once APPPATH . ('third_party/vendor/autoload.php');
        // $mpdf = new \Mpdf\Mpdf();
        $mpdf = new \Mpdf\Mpdf([
          'margin_left' => 0,
          'margin_right' => 0,
          'margin_top' => 0,
          'margin_bottom' => 0
        ]);
        $mpdf->WriteHTML('<style>
          #cover {
            background-image: url("' . $first_page_img . '");
            background-image-resize: 6;
            width: 1200; height: 2500; background-repeat: no-repeat;
          }
          #cover1 {
            background-color: #EAE3E2;opacity: 0.2;
            height:100px;
            margin-top:400px;
          }
          </style>
          <div id="cover" style="">
          <div  >
          <table style="padding-top:900px; width:100%;" cellpadding="0" cellspacing="0"><tr ><td></td></tr>
          <tr id="cover1"><td height="100" align="center"><h2>' . $cat_data->catalogName . '<br>' . $cat_data->companyName . '</h2></td></tr></table></div> </div>');
        $footer = '';

        $mpdf->AddPage();
        $footer = "<table name='footer' width=\"1000\">

           <tr>
             <td style='font-size: 18px; padding-bottom: 5px;' align=\"center\"> Powered by www.sowtex.com</td>
           </tr>
         </table>";
        $mpdf->SetFooter($footer);
        $mpdf->WriteHTML($content);
        //$org = $this->db->select('*')->from('xx_organisation')->where('orgId', $this->session->userdata('orgId'))->get()->row();
        $this->db->select('xx_user.first_name,xx_user.last_name,xx_organisation.logo,xx_user.designation,xx_organisation.orgName,xx_organisation.address,xx_user.email,
        xx_organisation.websiteUrl,xx_user.mobile,xx_organisation.orgProfile,xx_organisation.telephoneNo,xx_user.email');
        $this->db->from('xx_user');
        $org = $this->db->join('xx_organisation', 'xx_user.orgId  = xx_organisation.orgId')
          ->where("xx_user.id ", $this->session->userdata('user_id'))->get()->row();
        $sell_cat = unserialize($this->getSellingCategoryOfOrg($this->session->userdata('orgId')));
        //print_r($sell_cat);
        $mpdf->AddPage();
        foreach ($sell_cat as $key => $value) {
          $cat .= $this->Front_model->getCategoryNameById($value) . "<br/>";
        }
        //echo $cat;exit;
        $com_profile .= '<table  width="700p" style="padding-left:50px;padding-top:50px">

                        <tr >
                          <td>
                            <img src="' . base_url('assets/images/logos/') . $org->logo . '" height="50" width="100">
                              </td> 
                        </tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr style="margin-bottom:30px;margin-top:30px;"><td><h2>' . $org->orgName . '</h2></td></tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr><td><strong>
                          Contact Person: ' . $org->first_name . " " . $org->last_name . '<br/>
                          Mobile Number: ' . $org->mobile . '<br/>
                          Address: ' . $org->address . '<br/>
                          Phone: ' . $org->telephoneNo . '<br/>
                          E-mail : ' . $org->email . '<br/>
                          Website : ' . $org->websiteUrl . '<br/>
                          Address : ' . $org->address . '<br/>
                          Categories:<br/>' . $cat . '</strong>
                          </td></tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr><td><h2>About Company :</h2>
                        </td></tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr>
                          <td>' . $org->orgProfile . '</td>
                        </tr> 
                      </table>';
        $mpdf->WriteHTML($com_profile);
        //echo $org->orgProfile ;exit;
        //echo $com_profile;

        $name = $org->orgName . "_" . $this->input->post('id') . "_" . strtotime(date("y/m/d")) . rand(44444, 9999999) . ".pdf";
        $loc = 'assets/images/catalog/pdf/' . $name;
        //$loc = "m.pdf";

        $mpdf->Output($loc);
        //echo $loc;
        $data1['pdf'] = $name;
        if ($this->input->post('id') == '') {
          $res['error'] = "something Wrong";
          return $res;
          exit;
        }
        $this->db->where('id', $this->input->post('id'));
        $response = $this->db->update("xx_catalogue_master", $data1);
        if ($response == 1) {
          $res['status'] = "ok";
          $res['error'] = 0;
          return $res;
        }
      }
      public function filterProductInCatelogue()
      {

        //ini_set("display_errors",1);
        if ($this->input->post('cat') == "Shortlist Stock") {
          $stock = $this->shortlistedStock($this->session->userdata('user_id'));
          return $stock;
          exit;
        } else if ($this->input->post('cat') == "Shortlist Product") {
          $product = $this->shorlisted_products();
          return $product;
          exit;
        } else if ($this->input->post('cat') == "Stock") {
          $stock = $this->db->select("*")->from("xx_stock")->where("orgId", $this->session->userdata('orgId'))->get()->result_array();
          foreach ($stock as $result) {
            //print_r($result);exit;
            $result1['id'] = $result['id'];
            $result1['listing'] = $result['listing'];
            $result1['unique_id'] = $result['stockUniqueId'];
            $result1['loc'] = $result['location'];
            $result1['assured'] = $result['assured'];

            $result1['cat_name'] = $this->Front_model->getCategoryNameById($result['categoryId']);
            $result1['sub_cat_name'] = $this->Front_model->getSubCategoryNameById($result['subcategoryId']);
            $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();

            $size_str = '';
            $color_str = '';
            foreach ($data as $key => $value) {
              $size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
            }
            $color = $this->db->select('colorCode as color')->from('xx_stock_color')->where('stockid', $result['id'])->get()->result_array();
            $img = $this->db->select('stockImage as image')->from('xx_stock_image')->where('stockId', $result['id'])->get()->result_array();
            foreach ($color as $key => $value) {
              $color_str .= $value['color'] . ", ";
            }
            $result1['quantity'] = $result['quantity'] . " " . $result['quantity_unit'];
            $result1['image'] = $img;
            if ($img[0]['image'] == '') {
              continue;
            }
            $result1['color'] = $color_str;
            $result1['size'] = $size_str;
            $result1['views'] = rand(200, 5000);
            $final_data[] = $result1;
          }
          //echo $this->db->last_query();
          return $final_data;
          exit;
        }
        $this->db->select("*")->from("xx_product")->where("category_id", $this->input->post('cat'))->where("orgId", $this->session->userdata('orgId'));
        if ($this->input->post("visibility")) {
          $this->db->where("listing", $this->input->post('visibility'));
        }
        $this->db->where("deleted", "N");
        $data = $this->db->get()->result_array();

        foreach ($data as $result) {
          $result1[$result['id']]['id'] = $result['id'];
          $result1[$result['id']]['listing'] = $result['listing'];
          $result1[$result['id']]['unique_id'] = $result['unique_id'];
          $result1[$result['id']]['image'] = unserialize($result['image']);
          $result1[$result['id']]['cat_name'] = $this->Front_model->getCategoryNameById($result['category_id']);
          $result1[$result['id']]['sub_cat_name'] = $this->Front_model->getSubCategoryNameById($result['sub_category_id']);
          $prod_color = '';
          foreach ($this->getProductColorById($result1['id']) as  $row) {
            $prod_color .= $row['color'] . ", ";
          };
          $a = '';
          $sizes = $this->Front_model->getProductSizeById($result['id']);
          foreach ($sizes as $key => $value) {
            $a .= $value['size'] . ", ";
          }
          $result1[$result['id']]['size'] = rtrim($a, ", ");
          $result1[$result['id']]['color'] = rtrim($prod_color, ", ");
          unset($prod_color);
          $result1[$result['id']]['des'] = $result['description'];
          $result1[$result['id']]['md'] = $result['moq'];
          $result1[$result['id']]['views'] = rand(1, 999);
          $result1[$result['id']]['content'] = $result['content'];
          $result1[$result['id']]['folder'] = "Product";
        }
        return $result1;
      }

      public function deleteCatalogue()
      {
        $data['id'] = $this->input->post('id');
        $this->db->where("id", $this->input->post('id'));
        $cat = $this->db->delete("xx_catalogue_master", $data);
        if ($cat) {
          $cat_pro['catalogueId'] = $this->input->post('id');
          $this->db->where("catalogueId ", $this->input->post('id'));
          $cat_pro_del = $this->db->delete("xx_catalogue_product", $cat_pro);
          if ($cat_pro_del) {
            $data['status'] = "success";
            return $data;
          }
        }
      }

      public function getElearningTopics()
      {
        ini_set("display_error", 1);
        $result = $this->db->select("*")->From("xx_elearning_topic")->where("deleted", "N")->order_by("createdDate")->get()->result_array();
        return $result;
      }
      public function getElearningVideos()
      {
        $result = $this->db->select("*")->From("xx_elearning")->where("deleted", "N")->order_by("createdDate")->get()->result_array();
        return $result;
      }
      public function GetFilteredELearningVideos()
      {
        $this->db->select("*")->From("xx_elearning")->where("topic", $this->input->post('topic'));
        if ($this->input->post('text')) {

          $this->db->where("title like ", "%" . $this->input->post('text') . "%");
        }
        $result = $this->db->get()->result_array();
        return $result;
      }

      public function downloadComparisonSheet()
      {
        //ini_set("display_errors",1);
        require_once APPPATH . ('third_party/vendor/autoload.php');
        // $mpdf = new \Mpdf\Mpdf();
        $mpdf = new \Mpdf\Mpdf();;
        $enq_data = $this->db->select("*")->from("xx_enquiry")->where("id", $this->input->post('enq_id'))->get()->row();
        //print_r($enq_data->id);
        $accepted_userdata = $this->Enquiry_model->getAceptedUserDataOnEnquiry($enq_data->id);
        //echo "<pre>";print_r($accepted_userdata);
        $content = '<table><tr><td width="60%" style="text-align:center">
                  
                    <h2 >Supplier Comparison Sheet</h2> </td>
                    <td style="padding-left:100px;"  width="40%">
                    <img src="' . base_url('assets/images/sowtex/logo.jpg') . '" height="40" width="150"></td></tr></table>
                  <table>
                  <tr>
                  <td width="70">Enquiry No:
                  ' . $enq_data->enquiryUniqueId . '</td>
                  <td> Floated On: ' . date('d-m-Y h:i', strtotime($enq_data->createdDate)) . '     </td>
                  <td> Category: <br/>' . $this->Front_model->getCategoryNameById($enq_data->categoryId) . ' </td>
                  <td> Sub-Category: <br/>' . $this->Front_model->getSubCategoryNameById($enq_data->subCategoryId) . '</td>
                  <td> Order Quantity: <br/>' . $enq_data->minimumQuantity . ' </td>
                  <td> Target Price: <br/> ' . $enq_data->quotedPrice . '</td>
                   
                  </tr>
                  </table>';
        foreach ($accepted_userdata as $row) {
          $content .= '<br/><table style="background-color:#DFDFDF; width:100%">
            <tr>
            <td><strong>Company Name:</strong></td>
            <td> ' . $row['orgName'] . ' </td>
            <td><strong> Nature of Business: </strong></td>
            <td> ' . $this->Front_model->natureOfBussiness()[$row['natureOfBusinessId']] . ' </td>

             
            </tr>
            <tr>
            <td><strong>Name:</strong> :</td>
            <td>  ' . $row['first_name'] . " " . $row['last_name'] . '  </td>
            <td><strong>Location:</strong> </td>
            <td>  ' . $this->Front_model->getCityById($row['cityId']) . " " . $this->Front_model->getCountryNameByid($row['countryId']) . '  </td>

             
            </tr>
            <tr>
            <td><strong>Email: </strong></td>
            <td> ' . $row['email'] . '</td>
            <td><strong>Delivery Time: </strong></td>
            <td> ' . $row['responceTime'] . ' </td>


            </tr>
            <tr>
            <td> <strong>Phone No:</strong>.:</td>
            <td> ' . $row['mobile'] . ' </td>
            <td> <strong>Quoted Price:</strong> </td>
            <td> ' . $row['quotedPrice'] . '</td>

            </tr>
            <tr></tr><td></td><td></td><td></td><td style="text-align:right;">' . date('d-m-Y h:i', strtotime($row['createdDate'])) . '</td>
            </tr>

            </table>';
        }
        $footer = "<table name='footer' width='100%'>

          <tr>
            <td style='font-size: 18px; padding-bottom: 5px;' align=\"center\"> Powered by www.sowtex.com</td>
          </tr>
        </table>";
        $mpdf->SetFooter($footer);
        $mpdf->WriteHTML($content);
        $name = $this->input->post('enq_id') . ".pdf";
        $loc = 'assets/images/temp/' . $name;
        //$loc = "m.pdf";

        $mpdf->Output($loc);
        return  trim($loc);
      }
      public function manageProductFilter()
      {
        $this->db->select('*')->from('xx_product');
        $this->db->where("category_id", $this->input->post('cat'));
        if ($this->input->post('sub_cat')) {
          $this->db->where("sub_category_id ", $this->input->post('sub_cat'));
        }
        // if ($this->input->post('text')) {
        //   $this->db->group_start()
        //     ->where("content ", $this->input->post('text'))
        //     ->or_where("unique_id", $this->input->post('text'))
        //     ->or_where("description ", $this->input->post('text'))
        //     ->group_end();
        //   //$this->db->where("content ",$this->input->post('text'));  
        // }
        $this->db->where('orgId', $this->session->userdata('orgId'))->order_by("id", 'desc');
        $data = $this->db->get()->result_array();
        //echo $this->db->last_query();exit;
        foreach ($data as $key => $result) {
          $result1[$result['id']]['id'] = $result['id'];
          $result1[$result['id']]['listing'] = $result['listing'];
          $result1[$result['id']]['featured'] = $result['featured'];
          $result1[$result['id']]['gold'] = $result['gold'];
          $result1[$result['id']]['unique_id'] = $result['unique_id'];
          $result1[$result['id']]['image'] = unserialize($result['image']);
          $result1[$result['id']]['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['category_id'])->get()->row_array()['category'];
          $result1[$result['id']]['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subCategoryId', $result['sub_category_id'])->get()->row_array()['subCategoryName'];
          $data = $this->db->select('size,uom')->from('xx_product_size')->where('productid', $result['id'])->get()->result_array();
          $nsize = $size = $sizes = $uom = $uom_name = [];
          $sizes = $this->Front_model->getProductSizeById($result['id']);
          $a = '';
          foreach ($sizes as $key => $value) {
            $a .= str_replace(",", ", ", $value['size']) . ", ";
          }
          if ($uom[0] != '') {
            $data = $this->db->select("name")->from("xx_cat_uom")->where("id IN (" . implode(',', $uom) . ")")->get()->result_array();
            foreach ($data as $key => $value) {
              $uom_name[] = $value['name'];
            }
          }
          $result1[$result['id']]['sizes'] = trim($a, ", ");
          $prod_color = '';
          foreach ($this->getProductColorById($result['id']) as  $row) {
            $prod_color .= $row['color'] . ", ";
          };
          $result1[$result['id']]['color'] = rtrim($prod_color, ", ");
          $result1[$result['id']]['org'] = $this->getOrgDetailByOrgId($result['orgId']);
        }
        //print_r($result1);
        return $result1;
      }

      public function manageStockFilter()
      {
        $this->db->select('*')->from('xx_stock');
        $this->db->where("categoryId", $this->input->post('cat_id'));
        if ($this->input->post('sub_cat')) {
          $this->db->where("subcategoryId", $this->input->post('sub_cat'));
        }
        // if ($this->input->post('selectedText')) {
        //   $this->db->where("subcategoryId", $this->input->post('selectedText'));
        //   $this->db->group_start();
        //   $this->db->where("xx_stock.content like ", "%" . $this->input->post('selectedText') . "%");
        //   $this->db->or_where("xx_stock.description like ", "%" . $this->input->post('selectedText') . "%");
        //   $this->db->group_end();
        // }
        $this->db->where("xx_stock.deleted","N");
        $this->db->where('orgId', $this->session->userdata('orgId'))->order_by("id", 'desc');
        $data = $this->db->get()->result_array();
        //echo $this->db->last_query();exit;
        foreach ($data as $key => $result) {
          $result1[$result['id']]['id'] = $result['id'];
          $result1[$result['id']]['listing'] = $result['listing'];
          $result1[$result['id']]['unique_id'] = $result['stockUniqueId'];
          $result1[$result['id']]['cat_name'] = $this->db->select('category')->from('xx_category')->where('id', $result['categoryId'])->get()->row_array()['category'];
          $result1[$result['id']]['sub_cat_name'] = $this->db->select('subCategoryName')->from('xx_sub_category')->where('subcategoryId', $result['subcategoryId'])->get()->row_array()['subCategoryName'];
          $data = $this->db->select('sizeNumber,sizeUnit')->from('xx_stock_size')->where('stockId', $result['id'])->get()->result_array();

          $size_str = '';
          $color_str = '';
          foreach ($data as $key => $value) {
            $size_str .= $value['sizeNumber'] . " " . $value['sizeUnit'] . ", ";
          }
          $color = $this->db->select('colorCode as color')->from('xx_stock_color')->where('stockid', $result['id'])->get()->result_array();
          $img = $this->db->select('stockImage as image')->from('xx_stock_image')->where('stockId', $result['id'])->get()->result_array();
          //echo "<pre>";
          // print_r($img);exit;
          foreach ($color as $key => $value) {
            $color_str .= $value['color'] . ", ";
          }

          $result1[$result['id']]['image'] = $img;

          //print_r($img);exit;
          $result1[$result['id']]['color'] = rtrim($color_str,", ");
          $result1[$result['id']]['sizes'] = rtrim($size_str,", ");
          $result1[$result['id']]['listing'] = $result['listing'];
        }
        // echo "<pre>";
         //print_r($result1);exit;
        return $result1;
      }
      public function add_article()
      {
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['file']['size'] > 0) {

          $config['upload_path']   = './assets/images/articles';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('file')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
            //exit;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
            $data_enq['name'] = $this->input->post('art');
            $data_enq['description'] = $this->input->post('desc');
            $data_enq['createdBy'] = $this->session->userdata('user_id');

            $result = $this->db->insert("xx_articles", $data_enq);

            if ($result) {
              $res['status'] = 'ok';
              $this->session->set_flashdata('message', 'Article Created.');
            }
            return $res;
          }
        }
      }
      public function show_articles()
      {
        $result = $this->db->select("*")->from("xx_articles")->get()->result_array();
        return $result;
      }
      public function GetArticlesById($id)
      {
        $result = $this->db->select("*")->from("xx_articles")->where("id", $id)->get()->row();
        return $result;
      }
      public function update_articles()
      {
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['mobile']['size'] > 0) {

          $config['upload_path']   = './assets/images/articles';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('mobile')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
          }
          if ($this->input->post('id') == "") {
            $res['status'] = 'error';
            $res['error'] = "something wrong";
            return $res;
          }
        }
        $data_enq['name'] = $this->input->post('art');
        $data_enq['description'] = $this->input->post('desc');
        $data_enq['updatedBy'] = $this->session->userdata('user_id');
        $this->db->where("id", $this->input->post('id'));
        $result = $this->db->update("xx_articles", $data_enq);
        //echo $this->db->last_query();exit;
        if ($result) {
          $res['status'] = 'ok';
        }
        return $res;
      }
      public function deleteArticles()
      {
        $data['id'] = $this->input->post('unique_id');
        $result = $this->db->delete("xx_articles", $data);
        if ($result) {
          $data['status'] = "ok";
        }
        return $data;
      }


      public function updateFeaturedStatus()
      {
        //print_r($this->input->post());
        $data['visiblity'] = $this->input->post("status");
        $this->db->where("id", $this->input->post('id'));
        $result = $this->db->update("xx_featured_category", $data);
        if ($result) {
          $data['status'] = "ok";
        }
        return $data;
      }

      public function GetFeaturedCategoryById($id)
      {
        $result = $this->db->select("*")->from("xx_featured_category")->where("id", $id)->get()->row();
        //print_r($result);
        return $result;
      }
      public function GetFeaturedCategory()
      {
        $result = $this->db->select("*")->from("xx_featured_category")->get()->result_array();
        //print_r($result);
        return $result;
      }
      public function updateFeaturedCategory()
      {
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['mobile']['size'] > 0) {

          $config['upload_path']   = './assets/images/featured_category';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('mobile')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
          }
          if ($this->input->post('id') == "") {
            $res['status'] = 'error';
            $res['error'] = "something wrong";
            return $res;
          }
        }
        //$data_enq['name'] = $this->input->post('art');
        //$data_enq['description'] = $this->input->post('desc');
        $data_enq['updatedBy'] = $this->session->userdata('user_id');
        $this->db->where("id", $this->input->post('id'));
        $result = $this->db->update("xx_featured_category", $data_enq);
        //echo $this->db->last_query();exit;
        if ($result) {
          $res['status'] = 'ok';
        }
        return $res;
      }
      public function show_gallary()
      {
        $result = $this->db->select("*")->from("xx_gallary")->get()->result_array();
        return $result;
      }
      public function deleteGallary()
      {
        $data['id'] = $this->input->post('unique_id');
        $result = $this->db->delete("xx_gallary", $data);
        if ($result) {
          $data['status'] = "ok";
        }
        return $data;
      }
      public function add_gallary()
      {
        ini_set("display_errors", 1);
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['file']['size'] > 0) {

          $config['upload_path']   = './assets/images/Gallery/';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('file')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            echo 'derpak';
            exit;
            $res['status'] = 'error';
            return $res;
            //exit;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
            $data_enq['name'] = $this->input->post('art');
            $data_enq['description'] = $this->input->post('desc');
            $data_enq['createdBy'] = $this->session->userdata('user_id');

            $result = $this->db->insert("xx_gallary", $data_enq);

            if ($result) {
              $res['status'] = 'ok';
              $this->session->set_flashdata('message', 'Gallary Created.');
            }
            return $res;
          }
        }
        // print_r($this->input->post());exit;


      }
      public function update_gallary()
      {
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['mobile']['size'] > 0) {

          $config['upload_path']   = './assets/images/Gallery/';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('mobile')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
          }
          if ($this->input->post('id') == "") {
            $res['status'] = 'error';
            $res['error'] = "something wrong";
            return $res;
          }
        }
        $data_enq['name'] = $this->input->post('art');
        $data_enq['description'] = $this->input->post('desc');
        $data_enq['updatedBy'] = $this->session->userdata('user_id');
        $this->db->where("id", $this->input->post('id'));
        $result = $this->db->update("xx_gallary", $data_enq);
        //echo $this->db->last_query();exit;
        if ($result) {
          $res['status'] = 'ok';
        }
        return $res;
      }
      public function getGallaryById($id)
      {
        $result = $this->db->select("*")->from("xx_gallary")->where("id", $id)->get()->row();

        return $result;
      }
      public function GetTestimonialById($id)
      {
        $result = $this->db->select("*")->from("xx_testimonial")->where("id", $id)->get()->row();
        return $result;
      }
      public function show_testimonial_videos()
      {
        $result = $this->db->select("*")->from("xx_testimonial")->get()->result_array();
        return $result;
      }
      public function add_testimonial_videos()
      {
        $min_img_size = 200;
        $max_img_size = 20000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['file']['size'] > 0) {
          $config['upload_path']   = './assets/images/review';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          // $config['allowed_types'] = 'mp4|3gp|flv|mp3';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          // $config['vfile_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('file')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
            //exit; 
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
            // $data_enq['name'] = $this->input->post('name');
            // $data_enq['reviews'] = $this->input->post('reviews');
            // $data_enq['createdBy'] = $this->session->userdata('user_id');

            //$result = $this->db->insert("xx_testimonial", $data_enq);

            // if ($result) {
            //   $res['status'] = 'ok';
            //   $this->session->set_flashdata('message', 'Testimonial Created.');
            // }

            //return $res;
          }
        }
        if ($_FILES['videofile']['size'] > 0) {
          $config['upload_path']   = './assets/images/review';
          $config['allowed_types'] = 'mp4|3gp|flv|mp3';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload1');
          if (!$this->gst_upload1->do_upload('videofile')) {
            $error = array('error' => $this->gst_upload1->display_errors());
            print_r($error);

            $res['status'] = 'error';
            return $res;
            //exit; 
          } else {
            // $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
            $data_enq['video'] = $config['file_name'] . $this->gst_upload1->data('file_ext');
            $data_enq['name'] = $this->input->post('name');
            $data_enq['reviews'] = $this->input->post('reviews');
            $data_enq['createdBy'] = $this->session->userdata('user_id');

            $result = $this->db->insert("xx_testimonial", $data_enq);
            if ($result) {
              header("Location: " . base_url('control-panel/manage-testimonial'));
              // echo "exit";exit;
              //$this->Front_model->redirecturl(base_url('control-panel/manage-testimonial'));
              //$res['status'] = 'ok';
              //$this->session->set_flashdata('message', 'Testimonial Created.');
            }
            //return $res;
          }
        }
      }
      public function update_testimonial()
      {
        //ini_set("display_errors",1);
        $min_img_size = 20;
        $max_img_size = 20000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['mobile']['size'] > 0) {

          $config['upload_path']   = './assets/images/review/';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload2');
          if (!$this->gst_upload2->do_upload('mobile')) {
            $error = array('error' => $this->gst_upload2->display_errors());
            //print_r($error);
            $res['status'] = 'error';
            return $res;
          } else {

            $data_enq['image'] = $config['file_name'] . $this->gst_upload2->data('file_ext');
          }

          if ($this->input->post('id') == "") {
            $res['status'] = 'error';
            $res['error'] = "something wrong";
            return $res;
          }
        }
        //return $res;
        if ($_FILES['videofile']['size'] > 0) {
          $config['upload_path']   = './assets/images/review';
          $config['allowed_types'] = 'mp4|3gp|flv|mp3';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload1');
          if (!$this->gst_upload1->do_upload('videofile')) {
            $error = array('error' => $this->gst_upload1->display_errors());
            $res['status'] = 'error';
            return $res;
          } else {
            $data_enq['video'] = $config['file_name'] . $this->gst_upload1->data('file_ext');
          }
        }
        $data_enq['name'] = $this->input->post('name');
        $data_enq['reviews'] = $this->input->post('reviews');
        $data_enq['updatedBy'] = $this->session->userdata('user_id');
        $old_data = $this->db->select("image")->from("xx_testimonial")->where("id", $this->input->post('id'))->get()->row();
        unlink('assets/images/review/' . $old_data->image);
        unlink('assets/images/review/' . $old_data->video);
        $this->db->where("id", $this->input->post('id'));
        $result = $this->db->update("xx_testimonial", $data_enq);
        if ($result) {
          $res['status'] = 'ok';
        }
        return $res;
      }
      public function add_review()
      {
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['file']['size'] > 0) {

          $config['upload_path']   = './assets/images/review';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('file')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
            //exit;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
            $data_enq['name'] = $this->input->post('name');
            $data_enq['review'] = $this->input->post('review');
            $data_enq['createdBy'] = $this->session->userdata('user_id');

            $result = $this->db->insert("xx_reviews", $data_enq);

            if ($result) {
              $res['status'] = 'ok';
              $this->session->set_flashdata('message', 'review Created.');
            }
            return $res;
          }
        }
      }
      public function manage_review()
      {
        $result = $this->db->select("*")->from("xx_reviews")->get()->result_array();
        return $result;
      }
      public function GetReviewById($id)
      {
        $result = $this->db->select("*")->from("xx_reviews")->where("id", $id)->get()->row();
        return $result;
      }
      public function update_review()
      {
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['mobile']['size'] > 0) {
          $config['upload_path']   = './assets/images/Review';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('mobile')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
          }
          if ($this->input->post('id') == "") {
            $res['status'] = 'error';
            $res['error'] = "something wrong";
            return $res;
          }
        }
        $data_enq['name'] = $this->input->post('name');
        $data_enq['review'] = $this->input->post('review');
        $data_enq['updatedBy'] = $this->session->userdata('user_id');
        $this->db->where("id", $this->input->post('id'));
        $result = $this->db->update("xx_reviews", $data_enq);
        //echo $this->db->last_query();exit;
        if ($result) {
          $res['status'] = 'ok';
        }
        return $res;
      }

      public function deleteReview()
      {
        $data['id'] = $this->input->post('unique_id');
        $result = $this->db->delete("xx_reviews", $data);
        if ($result) {
          $data['status'] = "ok";
        }
        return $data;
      }
      public function gerReviewForHomePage()
      {
        $result = $this->db->select("*")->from("xx_reviews")->get()->result_array();
        return $result;
      }
      public function add_support()
      {
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['file']['size'] > 0) {

          $config['upload_path']   = './assets/images/support/';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('file')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
            //exit;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
            $data_enq['name'] = $this->input->post('art');
            $data_enq['description'] = $this->input->post('desc');
            $data_enq['createdBy'] = $this->session->userdata('user_id');

            $result = $this->db->insert("xx_support", $data_enq);

            if ($result) {
              $res['status'] = 'ok';
              $this->session->set_flashdata('message', 'Article Created.');
            }
            return $res;
          }
        }
        // print_r($this->input->post());exit;

      }
      public function manage_support()
      {
        $result = $this->db->select("*")->from("xx_support")->get()->result_array();
        return $result;
      }

      public function update_support()
      {
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['mobile']['size'] > 0) {

          $config['upload_path']   = './assets/images/support/';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('mobile')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
          }
          if ($this->input->post('id') == "") {
            $res['status'] = 'error';
            $res['error'] = "something wrong";
            return $res;
          }
        }
        $data_enq['name'] = $this->input->post('art');
        $data_enq['description'] = $this->input->post('desc');
        $data_enq['updatedBy'] = $this->session->userdata('user_id');
        $this->db->where("id", $this->input->post('id'));
        $result = $this->db->update("xx_support", $data_enq);
        //echo $this->db->last_query();exit;
        if ($result) {
          $res['status'] = 'ok';
        }
        return $res;
      }
      public function delete_support()
      {
        $data['id'] = $this->input->post('unique_id');
        $result = $this->db->delete("xx_support", $data);
        if ($result) {
          $data['status'] = "ok";
        }
        return $data;
      }

      public function getsupportById($id)
      {
        $result = $this->db->select("*")->from("xx_support")->where("id", $id)->get()->row();

        return $result;
      }
      public function add_new_stock()
      {
        //ini_set("display_errors",1);

        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['file']['size'] > 0) {

          $config['upload_path']   = './assets/images/new-stock/';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('file')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
            // exit;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
            // $data_enq['name'] = $this->input->post('art');
            // $data_enq['description'] = $this->input->post('desc');
            // $data_enq['createdBy'] = $this->session->userdata('user_id');

            // $result = $this->db->insert("xx_add_new_stock", $data_enq);

            // print_r($result);

            // if ($result) {
            //   $res['status'] = 'ok';
            //   $this->session->set_flashdata('message', 'Stock Created.');
            // }
            // return $res;
          }
        }
        //$data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
        // print_r($this->input->post());
        // echo $this->input->post('unique_id');
        //   exit;
        $stock_detail = $this->db->select("*")->from("xx_stock")->where("stockUniqueId", $this->input->post('unique_id'))->get()->row();
        //echo $stock_detail->id;exit;
        $data_enq['stock_id'] = $stock_detail->id;
        $data_enq['stock_quiqe_id'] = $this->input->post('unique_id');
        $data_enq['name'] = "name";
        $data_enq['description'] = "desc";
        $data_enq['createdBy'] = $this->session->userdata('user_id');

        $result = $this->db->insert("xx_add_new_stock", $data_enq);

        print_r($result);

        if ($result) {
          $res['status'] = 'ok';
          $this->session->set_flashdata('message', 'Stock Created.');
        }
        return $res;
      }
      public function manage_new_stock()
      {
        $result = $this->db->select("*")->from("xx_add_new_stock")->get()->result_array();
        return $result;
      }
      public function getNewstockById($id)
      {
        $result = $this->db->select("*")->from("xx_add_new_stock")->where("id", $id)->get()->row();

        return $result;
      }
      public function update_new_stock()
      {
        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['mobile']['size'] > 0) {

          $config['upload_path']   = './assets/images/new-stock/';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('mobile')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
          }
          if ($this->input->post('id') == "") {
            $res['status'] = 'error';
            $res['error'] = "something wrong";
            return $res;
          }
        }
        $stock_detail = $this->db->select("*")->from("xx_stock")->where("stockUniqueId", $this->input->post('unique_id'))->get()->row();
        //echo $this->db->last_query();
        if (count($stock_detail) < 1) {
          $res['status'] = 'error';
          $res['error'] = "Stock Not Exist";
          return $res;
        }
        //print_r($this->input->post());exit;
        //$this->db->where("id", $this->input->post('id'));
        //$result = $this->db->update("xx_add_new_stock", $data_enq);
        //$data_enq['name'] = $this->input->post('art');
        $data_enq['stock_id'] = $stock_detail->id;
        $data_enq['stock_quiqe_id'] = $stock_detail->stockUniqueId;
        $data_enq['updatedBy'] = $this->session->userdata('user_id');
        $this->db->where("id", $this->input->post('id'));
        $result = $this->db->update("xx_add_new_stock", $data_enq);
        //echo $this->db->last_query();exit;
        if ($result) {
          $res['status'] = 'ok';
        }
        return $res;
      }
      public function add_featured_category()
      {
        //ini_set("display_errors",1);

        $min_img_size = 20;
        $max_img_size = 10000;
        $min_img_height = 50;
        $max_img_height = 2000;
        $min_img_width = 60;
        $max_img_width = 2200;
        if ($_FILES['file']['size'] > 0) {

          $config['upload_path']   = './assets/images/featured_category/';
          $config['allowed_types'] = 'mp4|gif|jpg|png|jpeg';
          $config['file_name'] =  strtotime(date("Y-m-d")) . rand(111, 99999);
          $config['overwrite'] = false;
          $config['max_size']      = $max_img_size;
          $config['min_size']      = $min_img_size;
          $config['min_width']     = $min_img_width;
          $config['min_height']    = $min_img_height;
          $config['max_width']     = $max_img_width;
          $config['max_height']    = $max_img_height;
          $this->load->library('upload', $config, 'gst_upload');
          if (!$this->gst_upload->do_upload('file')) {
            $error = array('error' => $this->gst_upload->display_errors());
            print_r($error);
            $res['status'] = 'error';
            return $res;
            // exit;
          } else {
            $data_enq['image'] = $config['file_name'] . $this->gst_upload->data('file_ext');
            $data_enq['category'] = $this->input->post('art');
            $data_enq['description'] = $this->input->post('desc');
            $data_enq['createdBy'] = $this->session->userdata('user_id');
            $data_enq['deleted'] = "N";
            $data_enq['orderby'] = '';
            $data_enq['prefix'] = $this->input->post('prefix');
            $data_enq['tags'] = '';

            $result = $this->db->insert("xx_featured_category", $data_enq);

            //print_r($result);

            if ($result) {
              $res['status'] = 'ok';
              $this->session->set_flashdata('message', 'Stock Created.');
            }
            return $res;
          }
        }
      }
      public function delete_new_stock()
      {
        $data['id'] = $this->input->post('unique_id');
        $result = $this->db->delete("xx_add_new_stock", $data);
        if ($result) {
          $data['status'] = "ok";
        }
        return $data;
      }
      public function deleteTestimonial()
      {
        $data['id'] = $this->input->post('unique_id');
        $result = $this->db->delete("xx_testimonial", $data);
        if ($result) {
          $data['status'] = "ok";
        }
        return $data;
      }
      public function exportUserdata()
      {
        $this->db->select("xx_organisation.orgName,xx_user.first_name,xx_user.last_name,
        xx_user.email,xx_user.mobile,xx_organisation.planId,xx_user.creation_date");
        $this->db->from("xx_user");
        $this->db->join('xx_organisation', 'xx_organisation.orgId   = xx_user.orgId');
        if ($this->input->post('status') != "0") {
          $this->db->where("xx_user.status", $this->input->post('status'));
        }
        if ($this->input->post('app_status') != "0") {
          $this->db->where("xx_user.varifiedUser ", $this->input->post('app_status'));
        }
        if ($this->input->post('country') != "0") {
          $this->db->where("xx_organisation.countryId  ", $this->input->post('country'));
        }
        // if ($this->input->post('state') != "0") {
        //   $this->db->where("xx_organisation.countryId  ", $this->input->post('country'));
        // }
        if ($this->input->post('planId') != "0") {
          $this->db->where("xx_organisation.planId", $this->input->post('planId'));   
        }

        $this->db->where("xx_user.creation_date>", $this->input->post('start_date'));
        $this->db->where("xx_user.creation_date <", $this->input->post('end_date'));
        $listInfo = $this->db->get()->result_array();
        //echo $this->db->last_query();
        if ($listInfo) {
          $this->load->library('excel');
          $objPHPExcel = new PHPExcel();
          $objPHPExcel->setActiveSheetIndex(0);
          $titleArray = array("Company Name", "First Name", "Last Name","email","Mobile","Plan", "Registration Date");
          for ($i = 0; $i < count($titleArray); $i++) {
            $letter = $this->num2alpha($i);
            $cellName = $letter . '1';
            $objPHPExcel->getActiveSheet()->SetCellValue($cellName, $titleArray[$i]);
            $objPHPExcel->getActiveSheet()->getStyle($cellName)->getFont()->setBold(true);
          }
          $rowCount = 2;
          foreach ($listInfo as $key => $value) {

              $objPHPExcel->getActiveSheet()->SetCellValue("A" . $rowCount, $value['orgName']);
              $objPHPExcel->getActiveSheet()->SetCellValue("B" . $rowCount, $value['first_name']);
              $objPHPExcel->getActiveSheet()->SetCellValue("C" . $rowCount, $value['last_name']);
              $objPHPExcel->getActiveSheet()->SetCellValue("D" . $rowCount, $value['email']);
              $objPHPExcel->getActiveSheet()->SetCellValue("E" . $rowCount, $value['mobile']);
              $objPHPExcel->getActiveSheet()->SetCellValue("F" . $rowCount, $value['planId']);
              $objPHPExcel->getActiveSheet()->SetCellValue("G" . $rowCount, $value['creation_date']);
            $rowCount++;
          }
          $objPHPExcel->getActiveSheet()->getStyle('1:1')->getFont()->setBold(true);
          // set Row
          $rowCount = 2;
          $writer = PHPExcel_IOFactory::createWriter($objPHPExcel, "Excel2007");
          // Save the spreadsheet
          $writer->save('assets/uploads/user.xlsx');
          $res['status']="ok";
          $res['path']='assets/uploads/user.xlsx';
          return $res;
        }
      }
      public function num2alpha($n)
      {
        $r = '';
        for ($i = 1; $n >= 0 && $i < 10; $i++) {
          $r = chr(0x41 + ($n % pow(26, $i) / pow(26, $i - 1))) . $r;
          $n -= pow(26, $i);
        }
        return $r;
      }
      
      public function getNoofProductsForSuperAdmin(){
        if($this->session->userdata('type')=="SuperAdmin"){
          $result=$this->db->select("*")->From("xx_product")->get()->num_rows();
          return $result;
        }
        else {
          $ass_cat = $this->Enquiry_model->getAssignCatByRole($this->session->userdata('role'));
          $result=$this->db->select("*")->From("xx_product")
          ->where("category_id  IN ($ass_cat) ")
          ->get()->num_rows();
         return $result;

        }
        
        //echo $this->db->last_query();
         
      }  
      public function getProductImagesById($id){
        $result=$this->db->select('image')->from("xx_product")->where('id',$id)->get()->row()->image;
        return unserialize($result);
      }
      public function getProductUniqueById($id){
        $result=$this->db->select('unique_id')->from("xx_product")->where('id',$id)->get()->row()->unique_id;
        return $result;
      }

      public function getStockCatofOrg($orgId){
        $this->db->select('distinct(xx_stock.categoryId) as id,xx_category.category')->from("xx_stock");
        $this->db->join("xx_category", 'xx_category.id   = xx_stock.categoryId');
        $this->db->where("xx_stock.orgId",$orgId);
        $result=$this->db->get()->result_array();
        //echo $this->db->last_query();
        return $result;
      }
      public function get_SubCategory_ByCatId_Forstock(){
        $this->db->select("distinct(xx_sub_category.subCategoryId),xx_sub_category.subCategoryName")
        ->from("xx_sub_category");
        $this->db->join('xx_stock', 'xx_stock.subcategoryId  = xx_sub_category.subCategoryId');
        $this->db->where('xx_stock.categoryId   = xx_sub_category.categoryId ');
        $this->db->where("xx_stock.categoryId", $this->input->post('cat'));
        $this->db->where("xx_stock.orgId",$this->session->userdata('orgId'));
        $this->db->where("xx_stock.deleted", "N");
        $this->db->order_by("xx_sub_category.subCategoryName");
        $result = $this->db->get()->result_array();
        //echo $this->db->last_query();
        return $result;
      }

      public function UpdateSelCatofUserById(){
        
        $buyaee = $this->input->post('sellcat');
        foreach ($buyaee as $val) {
          $new_cat[] = $this->Front_model->getCategoryIdbyName($val);
        }
        //print_r($buy_arr);
        //ini_set("display_errors",1);
        $user_id= $this->input->post('user_id');
        $cell_cat = unserialize($this->Admin_model->getSellingCategoryOfOrg($this->input->post('orgId')));
        //echo "<pre>";
        //$removed_cat=array_diff($new_cat,$cell_cat);
        $removed_cat=array_diff($cell_cat,$new_cat);
        $plan_id=$this->Front_model->getOrgPlanByOrgId($this->input->post('orgId'));
        //print_r($this->session->userdata());exit;
        $allow_cat=$this->Front_model->getAllowCategoryCountByPlan($plan_id);
        //echo $allow_cat ."-".$new_cat;
        if(count($new_cat)>$allow_cat){
          $data['error']="Your Plan have $allow_cat Category Allowed you Select ".count($new_cat). " Category";
          $data['status']="error";
          $data['error_type']="limit";
          return $data;  
        }

        foreach($removed_cat as $cat){
          
          $count=$this->db->select("*")->from("xx_product")
          ->where("category_id",$cat)
          ->where("deleted","N")
          ->where("orgId",$this->input->post('orgId'))->get()->num_rows();
          //echo $this->db->last_query();
          if($count>0){
            $data['cat_name']=$this->Front_model->getCategoryNameById($cat);
            $data['status']="error";
            $data['error_type']="product";
            return $data;
          }
          
        }

        //$org_cat['sellCategory'] = serialize($this->input->post('sellCat'));
        foreach ($new_cat as $row) {
            $result = $this->db->select("subCategoryId")->from("xx_sub_category")->where("categoryid", $row)->get()->result_array();
            foreach ($result as $row) {
                $arr[] = $row['subCategoryId'];
            }
        }
        $org_pro['sellSubCategory'] = serialize($arr);
        $org_pro['sellCategory'] = serialize($new_cat);
        //$org_pro['buyCategory '] = serialize(explode(",", $this->input->post('buyCat')));
        $this->db->where("orgId",$this->input->post('orgId'));
        $this->db->where("userId",$this->input->post('user_id'));
        $result=$this->db->update("xx_org_category",$org_pro); 
        if($result){
          $res['status']="ok";
          return $res;
        }

      }

    }


    ?>
