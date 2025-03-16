import { request } from "../../utils/common";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    console.log("API called with ID:", id); // Добавляем лог

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const { data } = await request({
      url: `actors/get-all-filmography`,
      params: {
        nconst: id,
      },
    });

    if (!data) {
      return res.status(404).json({ error: "No data found" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: "Error during fetching actor" });
  }
}
