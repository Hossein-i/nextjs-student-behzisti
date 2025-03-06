import { gql } from '@apollo/client';
import { apolloClient } from '../../base';
import { InquiryQuery, InquiryQueryVariables } from '../../generates';

// documents
export const inquiryDocument = gql`
  query inquiry($dto: GetEstelamDto!, $nid: String!) {
    getEstelam(dto: $dto) {
      name
      family
      fatherName
    }
    getFolder(nid: $nid) {
      Rehab
      Commision
      Farzan
      Emdad
      CP
      Zanan
      ZananChild
      RehabChild
      ZananPoshtChild
      ZananPosht
      ZananTarkhis
      ZananTarkhisChild
      EmdadTakhis
    }
  }
`;

// queries
export const inquiryQuery = async (dto: InquiryQueryVariables['dto']) => {
  const { nid, birthDate } = dto;
  const { data } = await apolloClient.query<
    InquiryQuery,
    InquiryQueryVariables
  >({
    query: inquiryDocument,
    variables: { dto: { nid, birthDate }, nid },
  });

  const inquiry = {
    user: data.getEstelam,
    folder: data.getFolder[0],
  };
  return inquiry;
};

// types
export type InquiryQueryReturn = Awaited<ReturnType<typeof inquiryQuery>>;
