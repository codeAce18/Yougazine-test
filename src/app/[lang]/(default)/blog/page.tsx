import Container from '@components/ui/container';
import { Metadata } from 'next';
import Breadcrumb from "@components/ui/breadcrumb";
import {BlogContent} from "./blog-content";
import React from "react";
import BlogPageContent from "./blog-page-content";

export const metadata: Metadata = {
    title: 'Blog',
};

export default async function Page({
       params: { lang },
   }: {
    params: {
        lang: string;
    };
}) {
    return (
      <>
        <Container>
          <div
            className="pt-7 lg:pt-11 pb-16 lg:pb-20 blog-category"
          >
            <Breadcrumb lang={lang} />
            <BlogPageContent
              lang={lang}
              variant="grid"

            />
          </div>
        </Container>
      </>
    );
}
