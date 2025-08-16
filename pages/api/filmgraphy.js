import { request } from "../../utils/common";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    console.log("Fetching filmography for id:", id);

    const { data } = await request({
      url: "actors/get-all-filmography",
      params: { nconst: id },
    });

    // Проверка, что данные есть
    if (!data || !data.filmography) {
      return res.status(404).json({ error: "No filmography found" });
    }

    return res.status(200).json(data);
  } catch (err) {
    // Логирование для Vercel
    console.error("API Error:", err.response?.data || err.message);

    // Возврат корректного ответа клиенту
    return res.status(500).json({ error: "Failed to fetch actor filmography" });
  }
}
