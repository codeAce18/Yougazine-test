import Container from '@components/ui/container';
import { Metadata } from 'next';
import Breadcrumb from "@components/ui/breadcrumb";
import {BlogPost} from "../[slug]/blog-post";
import React from "react";
import { BlogSidebar } from '../blog-sidebar';

export const metadata: Metadata = {
    title: 'Blog',
};

export default async function Page({params: { lang },}: {params: {lang: string;};})
{
    return (
      <>
        <Container>
          <div className="pt-7 lg:pt-11 pb-10 blog-category">
            <Breadcrumb lang={lang} />
            <div className="flex pt-5 lg:pt-8 pb-16 lg:pb-20">
              <div className="flex-shrink-0 pe-8 xl:pe-12 hidden lg:block w-80 xl:w-90 sticky top-16 h-full">
                <BlogSidebar lang={lang} />
              </div>
              <div className="w-full ">
                <BlogPost key={'blogPost'} className={`pb-8`} lang={lang} />
              </div>
            </div>
          </div>
        </Container>
      </>
    );
}
