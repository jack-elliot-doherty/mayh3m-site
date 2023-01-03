import { NextPageWithLayout } from "../_app";

import Layout from "../../components/layout";

import { api } from "../../utils/api";

const Applicants:NextPageWithLayout = () => {
    const applicants = api.applicant.getAllVerifiedApplicants.useQuery({});
    return (
        <>
        <h1>Applicants</h1>
        {applicants.data?.map((applicant) => {
            return (
                <div key={applicant.id}>
                    <p>{applicant.name}</p>
                    <p>{applicant.email}</p>
                    <p>{applicant.why}</p>
                </div>
            );
        })
        }
        </>
    );
};

Applicants.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    );
};

export default Applicants;