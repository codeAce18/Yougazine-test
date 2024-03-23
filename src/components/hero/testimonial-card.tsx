"use client";

import Image from "next/image";
import React from "react";
import ReactStars from "react-stars";

interface Props {
    lang: string;
    category: string;
    title: string;
    image: string;
  }

const TestimonialCard: React.FC<Props> = ({
    lang = "en",
    category,
    title,
    image,
  }) => {
    return (
        <div className="m-3 p-3 shadow-sm rounded-lg odd:bg-skin-fill even:bg-skin-fillsec">
            <div className="flex items-center">
                <div className="joeimg me-2">
                    {/* <img src="/images/ppone.webp" alt="img" /> */}
                    <Image style={{borderRadius:"50%"}} src={image} width={100} height={100} alt={title} />
                   
                </div>
                <div>
                    <h4 className="text-[15px] text-skin-inverted font-bold">{title}</h4>
                    <p>{category}</p>
                    <ReactStars
                        count={5}
                        value={5}
                        size={15}
                        half={true}
                        edit={false}
                        color2={'#EDAC04'} />
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard;