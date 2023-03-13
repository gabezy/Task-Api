export const json = async (req, res) => {
  const data = [];

  for await (const chunk of req) {
    data.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(data).toString());
  } catch {
    req.body = null;
  }

  res.setHeader("Content-type", "application/json");
};
