export const sendForm = async (data: {
  name: string;
  site: string;
  phone: string;
}): Promise<{ error: null | string }> => {
  try {
    const res = await fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    await res.json();

    return { error: null };
  } catch (error) {
    return { error: "Произошла ошибка. Уже исправляем..." };
  }
};
