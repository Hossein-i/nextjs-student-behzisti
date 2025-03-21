import { universityDepartmentsQuery } from '@/shared/api/graphql';
import 'server-only';

export type UniversityDepartmentsProps = {
  countyId: string;
  typeId: string;
};

export const universityDepartments = async (
  props: UniversityDepartmentsProps
) => {
  try {
    const { countyId, typeId } = props;

    const response = await universityDepartmentsQuery({
      countyId: +countyId,
      typeId: +typeId,
    });

    return response;
  } catch (error) {
    console.error('[universityDepartments]: ', error);

    return null;
  }
};
