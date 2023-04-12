import toast from '../helpers/toast';

export const Validation = (type, value) => {
  switch (type) {
    case 'email':
      let reg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(value);

    case 'linkedin':
      if (
        /https?:\/\/(www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@\-/]))?/.test(
          value,
        )
      ) {
        return true;
      }
      return toast.info({message: 'Please enter a valid linkedin url'});

    case 'facebook':
      if (
        /https?:\/\/(www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w-]*\/)*([\w\-.]+)(?:\/)?/i.test(
          value,
        )
      ) {
        return true;
      }
      return toast.info({message: 'Please enter a valid facebook url'});

    case 'twitter':
      if (/https?:\/\/(www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(value)) {
        return true;
      }
      return toast.info({message: 'Please enter a valid twitter url'});

    case 'yelp':
      if (/https?:\/\/(www\.)?yelp\.com\/([a-zA-Z0-9_]+)/.test(value)) {
        return true;
      }
      return toast.info({message: 'Please enter a valid yelp url'});

    case 'instagram':
      if (/https?:\/\/(www\.)?instagram\.com\/([a-zA-Z0-9_]+)/.test(value)) {
        return true;
      }
      return toast.info({message: 'Please enter a valid instagram url'});

    case 'youtube':
      if (
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/.test(
          value,
        )
      ) {
        return true;
      }
      return toast.info({message: 'Please enter a valid youtube url'});

    case 'website':
      if (
        /(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/.test(
          value,
        )
      ) {
        return true;
      }
      return toast.info({message: 'Please enter a valid website url'});

    case 'number':
      if (/^[0-9]\d*(\.\d+)?$/.test(value)) {
        return true;
      }
      return false;

    case 'bname':
      return value.length >= 3;
    case 'address':
      return value.length > 0;
    case 'dropdown':
      return true;

    default:
      return true;
  }
};
