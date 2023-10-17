import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interface/error';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
    let errors: IGenericErrorMessage[] = [];
    let message = '';
    const statusCode = 400;

    if (error.code === 'P2025') {
        message = (error.meta?.cause as string) || 'Record not found';
        errors = [
            {
                path: '',
                message,
            },
        ];
    } else if (error.code === 'P2003') {
        if (error.message.includes('delete()` invocation:')) {
            message = 'Delete failed';
            errors = [
                {
                    path: '',
                    message,
                },
            ];
        }
    } else if (error.code === 'P2002' && error.meta?.target) {
        message = `This ${error.meta.target} is already in use.`;
        errors.push({
            path: error.meta.target.toString(),
            message: `This ${error.meta.target} is already in use.`,
        });
    } else if (error.code === 'P1010') {
        message = 'Access denied';
        errors = [
            {
                path: '',
                message,
            },
        ];
    }

    return {
        statusCode,
        message,
        errorMessages: errors,
    };
};

export default handleClientError;
