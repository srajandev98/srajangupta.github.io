# Glossary

- **Runnable**: one composable unit with `invoke` and `pipe`.
- **Chain**: fixed runnable composition where the application decides the path ahead of time.
- **Prompt Template**: formatter that fills named variables into prompt text.
- **Output Parser**: converter from raw model text into an application-friendly shape.
- **Model Adapter**: provider wrapper implementing the framework `Model` interface.
- **ModelRunnable**: adapter that lets a model participate in runnable chains.
- **Agent Runtime**: iterative loop that can inspect model output, call tools, and continue.
- **Tool**: externally executable function exposed to a model.
- **Structured Output**: machine-readable result such as validated JSON rather than free-form prose.
- **MVP**: minimal product scope focused on stable foundations.
