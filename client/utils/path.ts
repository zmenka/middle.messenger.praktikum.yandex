import { RouterPaths } from '../services/router/router.ts';

// '/profile/:id' {id:123} => '/profile/123'
export function getPathWithParams(
  path: string,
  params: Record<string, any> = {}
) {
  return path.replace(/:(\w+)/g, (_match, p1) => params[p1] || '');
}

// '/profile/:id' => '/profile'
// '/profile/123' => '/profile'
export function getPathWithoutParams(path: string) {
  const match = path.match(/^\/[\w-]*/);

  return match ? match[0] : '';
}

const BasePath = 'https://ya-praktikum.tech/api/v2/resources';

export function getFullImgPath(path?: string | null) {
  return path ? BasePath + path : '';
}

export function getParams(template: RouterPaths, path: string) {
  const templateParts = template.split('/');
  const pathParts = path.split('/');

  const params: Record<string, string> = {};

  templateParts.forEach((part: string, i: number) => {
    if (part.startsWith(':')) {
      params[part.slice(1)] = pathParts[i];
    }
  });

  return params;
}

export function getParamsWithoutTemplate(path: string) {
  const templatesWithParams = [RouterPaths.ChatSettings, RouterPaths.Chats];
  const shortPath = getPathWithoutParams(path);

  for (const template of templatesWithParams) {
    if (getPathWithoutParams(template) === shortPath) {
      return getParams(template, path);
    }
  }

  return {};
}

export function getParamFromQuery(
  param: string,
  type: 'string' | 'number',
  query: Record<string, string>
) {
  const value = query[param];

  if (!value) {
    return;
  }
  if (type === 'string') {
    return value;
  }

  const num = parseInt(value);

  return isNaN(num) ? undefined : num;
}
