export const fetchData = async () => {
  try {
    const response = await fetch(`https://search.bossjob.com/api/v1/search/job_filter?size=12&query=system`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const pagination = (nextPage) => {
  try {
    const response = fetch(`https://search.bossjob.com/api/v1/search/job_filter?size=12&query=system&page=${nextPage}`);
    const data = response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
