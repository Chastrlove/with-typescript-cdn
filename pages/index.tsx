const Test3 = () => {
    return <h1>Client Test 3</h1>
}

export async function getStaticProps() {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default Test3