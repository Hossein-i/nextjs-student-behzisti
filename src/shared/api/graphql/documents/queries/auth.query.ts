import { gql } from '@apollo/client';

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
