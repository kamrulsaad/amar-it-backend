import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import sendEmailTo, { ContactMessage } from '../../../helpers/sendEmail';

const contactEmail = async (message: ContactMessage): Promise<string> => {
    try {
        await sendEmailTo(message);
        return 'Email sent successfully';
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Email not sent');
    }
};

export const ContactService = {
    contactEmail,
};
