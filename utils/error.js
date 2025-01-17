export function notFoundError(res) {
    res.status(404).json({
        "success": false,
        "message": "Not Found",
    })
}

export function invalidError(res, message) {
    res.status(400).json({
        "success": false,
        "message": message,
    })
}