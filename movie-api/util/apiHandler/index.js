export const handleApiResponse = async (res, getData, resource) => {
  const data = await getData();
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({
      message: `The ${resource} you requested could not be found.`,
      status_code: 404,
    });
  }
};
