import { errorMessages } from './constants';

export default function findErrorMessage(errMessage: string) {
  const resultFind = errorMessages.find((message) => errMessage.includes(message.backendMessage));
  return resultFind ? resultFind.frontendMessage : errMessage;
}
