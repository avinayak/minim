/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query citySearch($query: String!) {\n  citySearch(query: $query) {\n    id\n    name\n    country\n    lat\n    lon\n    timezone\n  }\n}": types.CitySearchDocument,
    "query randomImageQuery($source: SourceTypes!, $query: String!, $category: CategoryTypes!) {\n  randomImage(source: $source, query: $query, category: $category) {\n    id\n    altDescription\n    color\n    description\n    links {\n      download\n    }\n    urls {\n      full\n      thumb\n    }\n    user {\n      firstName\n      lastName\n      username\n      links {\n        html\n      }\n    }\n    exif {\n      make\n      model\n      exposureTime\n      aperture\n      focalLength\n      iso\n    }\n    location {\n      city\n      country\n      name\n    }\n  }\n}": types.RandomImageQueryDocument,
    "query weather($lat: Float!, $lon: Float!) {\n  weather(lat: $lat, lon: $lon) {\n    temp\n    feelsLike\n    description\n    descriptionAlt\n    sunrise\n    sunset\n  }\n}": types.WeatherDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query citySearch($query: String!) {\n  citySearch(query: $query) {\n    id\n    name\n    country\n    lat\n    lon\n    timezone\n  }\n}"): (typeof documents)["query citySearch($query: String!) {\n  citySearch(query: $query) {\n    id\n    name\n    country\n    lat\n    lon\n    timezone\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query randomImageQuery($source: SourceTypes!, $query: String!, $category: CategoryTypes!) {\n  randomImage(source: $source, query: $query, category: $category) {\n    id\n    altDescription\n    color\n    description\n    links {\n      download\n    }\n    urls {\n      full\n      thumb\n    }\n    user {\n      firstName\n      lastName\n      username\n      links {\n        html\n      }\n    }\n    exif {\n      make\n      model\n      exposureTime\n      aperture\n      focalLength\n      iso\n    }\n    location {\n      city\n      country\n      name\n    }\n  }\n}"): (typeof documents)["query randomImageQuery($source: SourceTypes!, $query: String!, $category: CategoryTypes!) {\n  randomImage(source: $source, query: $query, category: $category) {\n    id\n    altDescription\n    color\n    description\n    links {\n      download\n    }\n    urls {\n      full\n      thumb\n    }\n    user {\n      firstName\n      lastName\n      username\n      links {\n        html\n      }\n    }\n    exif {\n      make\n      model\n      exposureTime\n      aperture\n      focalLength\n      iso\n    }\n    location {\n      city\n      country\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query weather($lat: Float!, $lon: Float!) {\n  weather(lat: $lat, lon: $lon) {\n    temp\n    feelsLike\n    description\n    descriptionAlt\n    sunrise\n    sunset\n  }\n}"): (typeof documents)["query weather($lat: Float!, $lon: Float!) {\n  weather(lat: $lat, lon: $lon) {\n    temp\n    feelsLike\n    description\n    descriptionAlt\n    sunrise\n    sunset\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;