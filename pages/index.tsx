import React from "react";
import Image from "next/image";
import src  from '../resouce/taozhaiquan.jpg'

const Test3 = () => {
    return <>
        <Image src={src}   priority={true}
               height={264}
               width={416}
               layout={"fixed"}/>
        <h1>123now Client Test</h1>
    </>


}

export async function getStaticProps() {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default Test3
