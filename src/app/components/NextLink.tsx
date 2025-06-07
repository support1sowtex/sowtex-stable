// components/NextLink.tsx
"use client";
import Link from "next/link";
import { forwardRef } from "react";

const NextLink = forwardRef(({ href, children, ...rest }: any, ref) => (
  <Link href={href} passHref legacyBehavior>
    <a ref={ref} {...rest}>{children}</a>
  </Link>
));

NextLink.displayName = "NextLink";

export default NextLink;
