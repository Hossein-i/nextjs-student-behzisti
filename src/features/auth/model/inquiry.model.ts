import { inquiryQuery } from '@/shared/api/graphql';
import 'server-only';

export type InquiryProps = {
  nid: string;
  birthDate: string;
};

export const inquiry = async (props: InquiryProps) => {
  try {
    const { nid, birthDate } = props;
    const response = await inquiryQuery({ nid, birthDate });
    return response;
  } catch (error) {
    console.error('[inquiry]: ', error);

    return null;
  }
};
