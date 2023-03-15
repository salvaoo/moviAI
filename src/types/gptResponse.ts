export type GPTResponse = {
   id:      string;
   object:  string;
   created: number;
   model:   string;
   usage?:   Usage;
   choices?: Choice[];
}
type Choice = {
   message?:       Message;
   finish_reason?: null;
   index?:         number;
}
type Message = {
   role?:    string;
   content?: string;
}
type Usage = {
   prompt_tokens?:     number;
   completion_tokens?: number;
   total_tokens?:      number;
}