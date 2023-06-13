# from transformers import AutoConfig, AutoModelForCausalLM

# config = AutoConfig.from_pretrained("bert-base-cased")
# print("loaded config")
# model = AutoModelForCausalLM.from_config(config)
# print("loaded model weights")
# print(type(model))


import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

# Define the model identifier or path
model_identifier = "gpt2-xl"  # Replace with your desired model, e.g., "gpt2", "gpt2-medium", "gpt2-large", etc.

# Load the tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(model_identifier)
model = AutoModelForCausalLM.from_pretrained(model_identifier)

# Set the device to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Define the context sequence
context = "What did Nietzsche think about the meaning of life?"

# Tokenize the input sequence
input_ids = tokenizer.encode(context, return_tensors="pt").to(device)

# Generate predictions for the next word
with torch.no_grad():
    outputs = model.generate(input_ids, max_length=200, num_return_sequences=1, do_sample=True)

# Decode and print the generated predictions
for i, output in enumerate(outputs):
    generated_sequence = tokenizer.decode(output, skip_special_tokens=True)
    print(f"Generated sequence {i+1}: {generated_sequence}")






