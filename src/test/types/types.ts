export type Subject =
   | "Химия"
   | "Физика"
   | "Биология"
   | "Математика"
   | "Обществознание"
   | "Русский язык"
   | "Английский чзык"
   | "Информатика"
   | "География"
   | "История"

export type Department = "УИТС" | "ИТ" | "ЭХТ" | "ЭУ" | "Т" | "СПО"

export type Qualification = "Бакалавриат" | "Специалитет" | "Магистратура" | "СПО"

export type Tag = {
   name: string
   emoji: string
}
