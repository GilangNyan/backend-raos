interface apiResponse {
    code: string,
    status: string,
    message: string,
    data?: any
}

export const successResponse = (data?: any): apiResponse => {
    return {
        code: '00',
        status: '',
        message: 'Berhasil',
        data: data
    }
}