import { gql } from '@apollo/client'
import client from './apolloClient'
import Fileds from './fileds'
import { handleRequestGraphql } from '../lib/fetch.lib'
const omit = require('object.omit')

type SortType = {
  field: string
  order: string
}
type PaginationType = {
  page: number
  perPage: number
}
type FilterType = any

interface queryProps {
  sort: SortType
  pagination: PaginationType
  filter: FilterType
  id: string
  target: string
}

export const dataProvider = {
  getList: async (resource: string, { sort, pagination, filter }: queryProps) => {
    const { field, order } = sort
    const { page, perPage } = pagination
    const filters = filter

    return new Promise(async (resolve, reject) => {
      try {
        const request = () =>
          client
            .query({
              query: gql`
                   query ($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: Filters) {
                       ${`${resource}_list`}(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
              ${Fileds[`${resource}_list`]}
           }
     ${resource}_list_meta(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
       count
       }
        }`,
              variables: {
                perPage: perPage,
                page: page - 1,
                sortField: field,
                sortOrder: order,
                filter: filters,
              },
            })
            .then((result) => {
              if (result.data) {
                return {
                  error: null,
                  data: {
                    data: result.data[`${resource}_list`],
                    total: result.data[`${resource}_list_meta`].count,
                  },
                }
              }
              return { error: 500, data: null }
            })
            .catch((e) => {
              if (e.networkError) {
                return {
                  error: e?.networkError?.response?.status ? e?.networkError?.response.status : 500,
                  data: null,
                }
              }

              return { error: 400, data: null }
            })

        const { error, data } = await handleRequestGraphql(request)

        if (error === 401) {
          return reject(401)
        }

        if (error && !data) {
          return reject(error)
        }

        return resolve(data)
      } catch (error) {
        return reject(500)
      }
    })
  },
  getOne: (resource: string, params: { id: string }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = () =>
          client
            .query({
              query: gql`
                  query ($id: String!) {
                      ${resource}(id: $id) {
                          ${Fileds[resource]}
                      }
                  }`,
              variables: {
                id: params.id,
              },
            })
            .then((result) => {
              if (result.data) {
                return {
                  error: null,
                  data: { data: result.data[`${resource}`] },
                }
              }
              throw Error
            })
            .catch((e) => {
              if (e.networkError) {
                return {
                  error: e?.networkError?.response?.status ? e?.networkError?.response.status : 500,
                  data: null,
                }
              }

              return { error: 400, data: null }
            })

        const { error, data } = await handleRequestGraphql(request)

        if (error === 401) {
          return reject(401)
        }

        if (error && !data) {
          return reject(error)
        }

        return resolve(data)
      } catch (error) {
        return reject({ message: 'error' })
      }
    })
  },
  update: (resource: string, params: { id: string; data: any }) => {
    const Data = params.data
    const Keys = Fileds[`update_${resource}`].split(' ')

    const filtered = Object.keys(Data)
      .filter((key) => Keys.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: Data[key],
        }
      }, {})

    return new Promise(async (resolve, reject) => {
      try {
        const request = () =>
          client
            .mutate({
              mutation: gql`
                  mutation ($id: String!, $data: update_${resource}) {
                      update_${resource}(id: $id, data: $data) {
                          ${Fileds[`${resource}`]}
                      }
                  }`,
              variables: {
                id: params.id,
                data: omit(filtered, ['__typename']),
              },
            })
            .then((result) => {
              if (result.data) {
                return {
                  error: null,
                  data: { data: result.data[`update_${resource}`] },
                }
              }

              throw Error
            })
            .catch((e) => {
              if (e.networkError) {
                return {
                  error: e?.networkError?.response?.status ? e?.networkError?.response.status : 500,
                  data: null,
                }
              }

              return { error: 400, data: null }
            })

        const { error, data } = await handleRequestGraphql(request)

        if (error === 401) {
          return reject(401)
        }

        if (error && !data) {
          return reject(error)
        }

        return resolve(data)
      } catch (error) {
        return reject({ message: 'error' })
      }
    })
  },
  getManyReference: (resource: string, { target, id, sort, pagination, filter }: queryProps) => {
    const { field, order } = sort
    const { page, perPage } = pagination
    const filters = filter

    return new Promise(async (resolve, reject) => {
      try {
        const request = () =>
          client
            .query({
              query: gql`
          query ($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: Filters, $target: String, $id: String) {
              ${resource}(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter, target: $target, id: $id) {
                ${Fileds[resource]}
            }
          ${resource}_meta(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter, target:$target, id: $id) {
               count
        }
          }`,
              variables: {
                perPage: perPage,
                page: page - 1,
                sortField: field,
                sortOrder: order,
                filter: filters,
                target,
                id,
              },
            })
            .then((result) => {
              if (result.data) {
                return {
                  error: null,
                  data: {
                    data: result.data[resource],
                    total: result.data[`${resource}_meta`].count,
                  },
                }
              }

              throw Error
            })
            .catch((e) => {
              if (e.networkError) {
                return {
                  error: e?.networkError?.response?.status ? e?.networkError?.response.status : 500,
                  data: null,
                }
              }

              return { error: 400, data: null }
            })

        const { error, data } = await handleRequestGraphql(request)

        if (error === 401) {
          return reject(401)
        }

        if (error) {
          return reject(error)
        }

        return resolve(data)
      } catch (error) {
        return reject({ message: 'error' })
      }
    })
  },
  create: (resource: string | number, params: { data: any }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = () =>
          client
            .mutate({
              mutation: gql`
                  mutation ($data: create_${resource}) {
                    create_${resource}(data: $data) {
                          ${Fileds[resource]}
                      }
                  }`,
              variables: {
                data: omit(params.data),
              },
            })
            .then((result) => {
              if (result.data) {
                return {
                  error: null,
                  data: { data: result.data[`create_${resource}`] },
                }
              }

              throw Error
            })
            .catch((e) => {
              if (e.networkError) {
                return {
                  error: e?.networkError?.response?.status ? e?.networkError?.response.status : 500,
                  data: null,
                }
              }

              if (e?.message === 'Email exists') {
                return { error: 'Email exists', data: null }
              }

              return { error: 400, data: null }
            })

        const { error, data } = await handleRequestGraphql(request)

        if (error === 401) {
          return reject(401)
        }

        if (error && !data) {
          return reject(error)
        }

        return resolve(data)
      } catch (error) {
        return reject({ message: 'error' })
      }
    })
  },
  getMany: (resource: string, params: { ids: any }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = () =>
          client
            .query({
              query: gql`
                    query ($ids: [String]) {
                        ${resource}_getMany(ids: $ids) {
                            ${Fileds[resource]}
                        }
                    }`,
              variables: {
                where: {
                  id: { _in: params.ids },
                },
              },
            })
            .then((result) => {
              if (result.data) {
                return {
                  error: null,
                  data: result.data[`${resource}_getMany`],
                }
              }

              throw Error
            })
            .catch((e) => {
              if (e.networkError) {
                return {
                  error: e?.networkError?.response?.status ? e?.networkError?.response.status : 500,
                  data: null,
                }
              }

              return { error: 400, data: null }
            })

        const { error, data } = await handleRequestGraphql(request)

        if (error === 401) {
          return reject(401)
        }

        if (error && !data) {
          return reject(error)
        }

        return resolve({ data })
      } catch (error) {
        return reject({ message: 'error' })
      }
    })
  },
  //custom
  getData: (resource: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = () =>
          client
            .query({
              query: gql`
                  query {
                      ${resource} {
                          ${Fileds[resource]}
                      }
                  }`,
            })
            .then((result) => {
              if (result.data) {
                return {
                  error: null,
                  data: { data: result.data[`${resource}`] },
                }
              }
              throw Error
            })
            .catch((e) => {
              if (e.networkError) {
                return {
                  error: e?.networkError?.response?.status ? e?.networkError?.response.status : 500,
                  data: null,
                }
              }

              return { error: 400, data: null }
            })

        const { error, data } = await handleRequestGraphql(request)

        if (error === 401) {
          return reject(401)
        }

        if (error && !data) {
          return reject(error)
        }

        return resolve(data)
      } catch (error) {
        return reject({ message: 'error' })
      }
    })
  },
  //not tested or not needed
  // updateMany: (resource: any, params: { ids: any; data: any }) => {
  //   return client
  //     .mutate({
  //       mutation: gql`
  //             mutation ($where: ${resource}!, $data: ${resource}!) {
  //                 update_${resource}(where: $where, _set: $data) {
  //                     affected_rows
  //                 }
  //             }`,
  //       variables: {
  //         where: {
  //           id: { _in: params.ids },
  //         },
  //         data: params.data,
  //       },
  //     })
  //     .then((result) => ({
  //       data: params.ids,
  //     }))
  // },
  // delete: (resource: string | number, params: { id: any }) => {
  //   return client
  //     .mutate({
  //       mutation: gql`
  //             mutation ($id: Int!) {
  //                 delete_${resource}_by_pk(id: $id) {
  //                     ${Fileds[resource]}
  //                 }
  //             }`,
  //       variables: {
  //         id: params.id,
  //       },
  //     })
  //     .then((result) => ({
  //       data: result.data[`delete_${resource}_by_pk`],
  //     }))
  // },
  // deleteMany: (resource: any, params: { ids: any }) => {
  //   return client
  //     .mutate({
  //       mutation: gql`
  //             mutation ($where: ${resource}_bool_exp!) {
  //                 delete_${resource}(where: $where) {
  //                     affected_rows
  //                 }
  //             }`,
  //       variables: {
  //         where: {
  //           id: { _in: params.ids },
  //         },
  //       },
  //     })
  //     .then((result) => ({
  //       data: params.ids,
  //     }))
  // },
}
