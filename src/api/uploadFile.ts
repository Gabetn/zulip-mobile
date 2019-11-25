/* @flow strict-local */
import { Auth, ApiResponseSuccess } from './transportTypes';
import { apiFile } from './apiFetch';
import { getFileExtension, getMimeTypeFromFileExtension } from '../utils/url';
type ApiResponseUploadFile = {
  uri: string;
} | ApiResponseSuccess;
export default ((auth: Auth, uri: string, name: string): Promise<ApiResponseUploadFile> => {
  const formData = new FormData();
  const extension = getFileExtension(name);
  const type = getMimeTypeFromFileExtension(extension); // $FlowFixMe

  formData.append('file', {
    uri,
    name,
    type,
    extension
  });
  return apiFile(auth, 'user_uploads', formData);
});
