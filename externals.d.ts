/*
  This file can be used to type external modules
  if there's no type definitions available for them.
  The easy and cheap but untyped way to go about it:

    declare module "foo";

  If you want to write better definitions,
  the TypeScript Handbook is the place to look at:

  http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html

  Of course, you should always check if a @types package exists
  for the module you want to use first.

  ---

  For importing various non-code assets with Webpack,
  we need to add custom definitions here in order to make
  TypeScript not complain about them. This can be achieved like so:

    declare module "*.svg" {
      const content: any;
      export default content;
    }

  Rinse and repeat for any additional filetypes you use in your project.
*/
