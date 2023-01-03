import { type NextPage } from "next";
import { ReactElement } from "react";
import Layout from "../../components/layout";
import { NextPageWithLayout } from "../_app";
import { api } from "../../utils/api";
import {useRouter} from "next/router";


const Verify: NextPageWithLayout = () => {
    const { query } = useRouter();
    const applicant = api.applicant.getApplicant.useQuery({id: (query.userId as string)});
    return (
        <>
        <h1>Verify</h1>
        <p>hello {applicant.data?.name}</p>
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