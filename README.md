# Knowlee - Development Guidelines

To ensure that our codebase remains clean, readable, and maintainable, we've outlined some best practices below. Please make sure to follow them.

# Setup

### Doppler

To manage secrets, this repo uses [doppler](https://doppler.com). Follow the [instructions to install the CLI](https://docs.doppler.com/docs/install-cli).

After installing the cli, run `doppler login` to get an access token.

Once doppler is setup, run `doppler setup` in the main directory. 

### Install

Run `yarn` from the root directory to install all dependencies. Verify that everything is working as expected by running `yarn build` to build all projects.

# Guidelines

## Pull, Branch, Push

- main is prod
- stg is stage
- Main and stg should be always aligned, unless there are new features not released in prod yet.
- Pull from stg, create a new branch from stg. Use the naming convention that you can see in the historical activities.
- Create a PR to stg once you are ready.

## 🚫 Avoid `any`

- Type safety is crucial. Avoid using the `any` type unless absolutely necessary. Strong types lead to better code readability and fewer runtime errors.

## 🖥️ API Practices

- **Minimize Client-side API Logic**: Keep the client-side API calls straightforward. If there's logic that requires multiple API requests, consider handling that server-side.

- **API Wrapper Usage**: Use the API wrapper found in `src/api`. If the data type you need isn't already available, create a new file. Here's a template:

```typescript
export const getUser = async (
  userAuth0Id: string,
  token: string
): Promise<User | null> => {
  const res = await apiRequest<ServerResponse<User>>(
    "get",
    `user/${userAuth0Id}`,
    token
  );
  if (!res.data.success) return null;
  return res.data.result;
};
```

## 🎨 UI Practices

- **Chakra-UI First**: Prioritize using Chakra-UI for the UI. If Chakra-UI isn't sufficient for a particular need, you may use styled-components, but only as a last resort.

**Component Structure**:

- Use our folder structure for components:

```bash
NameOfTheComponent
├── SubComponentFolder
│   └── index.tsx
└── index.tsx
```

- Keep components concise for easier readability.
- If a component becomes too lengthy, extract some of its logic into a separate hook or split it into smaller sub-components.
- UI Integrity: Whenever you modify or add new UI elements, ensure they don't break the existing UI or conflict with prior implementations.

## 🧪 Linting & Typing

Before pushing your changes, execute yarn lint to ensure no type errors or linting issues.

Thank you for your contributions and adherence to our best practices!
