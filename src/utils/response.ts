interface apiResponse {
    status: string,
    message: string,
    data?: any
}

export const successResponse = (data?: any): apiResponse => {
    return {
        status: 'success',
        message: 'Berhasil',
        data: data
    }
}

export const failResponse = (data?: any): apiResponse => {
    return {
        status: 'fail',
        message: 'Bad request',
        data: data
    }
}

export const errorResponse = (data?: any): apiResponse => {
    return {
        status: 'error',
        message: 'Internal server error',
        data: data
    }
}