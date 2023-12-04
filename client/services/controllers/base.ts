import modalError from '../../components/modal-error/modal-error.ts';



export function catchPromiseWithModalError(target: any,propertyName: any,descriptor: any) {
  const method = descriptor.value;

  descriptor.value = function(...args: any) {
    return method.apply(target, args)
    .catch((error: any) => {
      console.log(error)
      modalError.showError(error.reason || 'Somterhing went wrong');
      // throw error;
    });
  };
}

