import { type NextPage } from "next";
import { ReactElement } from "react";
import Layout from "../../components/layout";
import { NextPageWithLayout } from "../_app";
// import { api } from "../utils/api";


const Verify: NextPageWithLayout = () => {

    return (
        <>
        <h1>Verify</h1>
        </>
    );
    };

Verify.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    );
    };

export default Verify;