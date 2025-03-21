import { signUpMutation } from '@/shared/api/graphql';
import 'server-only';

export type SignUpProps = {
  person: {
    nid: string;
    birthDate: string;
    firstName: string;
    lastName: string;
    cellphone: string;
  };
  address: {
    province: string;
    county: string;
    deviation: string;
    subDeviation: string;
    AddressLine1: string;
  };
  university: {
    studentNumber: string;
    UniversityAcceptanceDate: string;
    Group: string;
    SubGroup: string;
    Level: string;
    major: string;
    Province: string;
    County: string;
    Type: string;
    department: string;
  };
};

export const signUp = async (props: SignUpProps) => {
  try {
    const { person, address, university } = props;

    const response = await signUpMutation({ person, address, university });

    if (!response) {
      throw new Error('Failed to sign up.');
    }

    return response;
  } catch (error) {
    console.error('[signUp]: ', error);

    return null;
  }
};
