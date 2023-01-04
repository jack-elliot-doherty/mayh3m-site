import { NextPageWithLayout } from "../_app";
import { useSession } from "next-auth/react";

import Layout from "../../components/layout";

import { api } from "../../utils/api";

const Applicants:NextPageWithLayout = () => {



    const {data: sessionData} = useSession();
    console.log(sessionData);

    const applicants = api.applicant.getAllVerifiedApplicants.useQuery(
        undefined,
        {enabled: sessionData?.user?.role === "admin"},
    );

    if (sessionData && sessionData.user?.role === "admin") {
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
    } else {
    
    
    return (
        <div>
            Not authorized
        </div>
        
    );}
};

Applicants.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    );
};

export default Applicants;