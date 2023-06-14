from rest_framework.views import APIView
from rest_framework.response import Response
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

class DoubleMessageAPIView(APIView):
    def post(self, request, format=None):
        # Define the model identifier or path
        model_identifier = "gpt2" 

        # Load the tokenizer and model
        tokenizer = AutoTokenizer.from_pretrained(model_identifier)
        model = AutoModelForCausalLM.from_pretrained(model_identifier)

        # Set the device to GPU if available
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model.to(device)

        # Define the context sequence
        context = request.data.get('message', '')

        # Tokenize the input sequence
        input_ids = tokenizer.encode(context, return_tensors="pt").to(device)

        # Generate predictions for the next word
        with torch.no_grad():
            outputs = model.generate(input_ids, max_length=200, num_return_sequences=1, do_sample=True)

        # Decode and print the generated predictions
        generated_sequence = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return Response({'response': generated_sequence})# views.py