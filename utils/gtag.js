export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;
export const GOOGLE_VERIF = process.env.GOOGLE_VERIF;

export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

export const exception = ({ error, fatal }) => {
  window.gtag("event", "exception", {
    description: error,
    fatal
  });
};
