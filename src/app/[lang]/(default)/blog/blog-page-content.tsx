'use client';

import {useBlogsQuery} from "@framework/blog/get-all-blogs";
import {BlogContent} from "./blog-content";
import {BlogBigContent} from "./blog-category-big/blog-big-content";
import {BlogListContent} from "./blog-category-list/blog-list-content";

import React from "react";

export default function BlogPageContent({ lang , variant }: {lang: string ,  variant?: string,}) {
    const {data, isLoading, error} = useBlogsQuery();
    const dataBlog = data?.data || [];
    console.log(dataBlog);

    const renderBlogContent = (variant) => {
        switch(variant) {
            case 'grid':
                return <BlogContent dataBlog = {dataBlog} className={`pt-8 pb-8`} lang={lang}/>
            case 'list':
                return <BlogListContent dataBlog = {dataBlog} className={`pt-8 pb-8`} lang={lang}/>
            case 'big':
                return <BlogBigContent dataBlog = {dataBlog} className={`pt-8 pb-8`} lang={lang}/>
            default:
                return <BlogContent dataBlog = {dataBlog} className={`pt-8 pb-8`} lang={lang}/>
        }
    }
    return (
        <>
            {!isLoading ? (
                renderBlogContent(variant)
            ) : (
                <div className={"pt-8 pb-8"}>Loading...</div>
            )}

        </>
    );
}
