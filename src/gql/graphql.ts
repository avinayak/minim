/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum CategoryTypes {
  Collection = 'COLLECTION',
  SearchTerm = 'SEARCH_TERM',
  User = 'USER'
}

export type City = {
  __typename?: 'City';
  country?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lat?: Maybe<Scalars['Float']>;
  lon?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  altDescription?: Maybe<Scalars['String']>;
  blurHash?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  links?: Maybe<Links>;
  urls?: Maybe<Urls>;
  user?: Maybe<User>;
};

export type Links = {
  __typename?: 'Links';
  download?: Maybe<Scalars['String']>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  citySearch?: Maybe<Array<Maybe<City>>>;
  randomImage?: Maybe<Image>;
  weather?: Maybe<Weather>;
};


export type RootQueryTypeCitySearchArgs = {
  query: Scalars['String'];
};


export type RootQueryTypeRandomImageArgs = {
  category: CategoryTypes;
  query: Scalars['String'];
  source: SourceTypes;
};


export type RootQueryTypeWeatherArgs = {
  lat: Scalars['Float'];
  lon: Scalars['Float'];
};

export enum SourceTypes {
  Artsy = 'ARTSY',
  Unsplash = 'UNSPLASH'
}

export type Urls = {
  __typename?: 'Urls';
  full?: Maybe<Scalars['String']>;
  thumb?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Weather = {
  __typename?: 'Weather';
  description?: Maybe<Scalars['String']>;
  descriptionAlt?: Maybe<Scalars['String']>;
  feelsLike?: Maybe<Scalars['Float']>;
  sunrise?: Maybe<Scalars['Int']>;
  sunset?: Maybe<Scalars['Int']>;
  temp?: Maybe<Scalars['Float']>;
};

export type CitySearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type CitySearchQuery = { __typename?: 'RootQueryType', citySearch?: Array<{ __typename?: 'City', id: number, name?: string | null, country?: string | null, lat?: number | null, lon?: number | null, timezone?: string | null } | null> | null };

export type RandomImageQueryQueryVariables = Exact<{
  source: SourceTypes;
  query: Scalars['String'];
  category: CategoryTypes;
}>;


export type RandomImageQueryQuery = { __typename?: 'RootQueryType', randomImage?: { __typename?: 'Image', id: string, altDescription?: string | null, color?: string | null, description?: string | null, links?: { __typename?: 'Links', download?: string | null } | null, urls?: { __typename?: 'Urls', full?: string | null, thumb?: string | null } | null, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null } | null } | null };

export type WeatherQueryVariables = Exact<{
  lat: Scalars['Float'];
  lon: Scalars['Float'];
}>;


export type WeatherQuery = { __typename?: 'RootQueryType', weather?: { __typename?: 'Weather', temp?: number | null, feelsLike?: number | null, description?: string | null, descriptionAlt?: string | null, sunrise?: number | null, sunset?: number | null } | null };


export const CitySearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"citySearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"citySearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lon"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}}]} as unknown as DocumentNode<CitySearchQuery, CitySearchQueryVariables>;
export const RandomImageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"randomImageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceTypes"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryTypes"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"randomImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"altDescription"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"download"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"full"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<RandomImageQueryQuery, RandomImageQueryQueryVariables>;
export const WeatherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"weather"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lat"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lon"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weather"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lat"}}},{"kind":"Argument","name":{"kind":"Name","value":"lon"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lon"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"temp"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLike"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"descriptionAlt"}},{"kind":"Field","name":{"kind":"Name","value":"sunrise"}},{"kind":"Field","name":{"kind":"Name","value":"sunset"}}]}}]}}]} as unknown as DocumentNode<WeatherQuery, WeatherQueryVariables>;