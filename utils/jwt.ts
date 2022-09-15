import jwt from 'jsonwebtoken'


export const signToken = (_id: string, email: string) => {
    if(!process.env.JWT_SECRET_SEED) {
        throw new Error('Not available seed for JWT - Check environments variables');
    }

    return jwt.sign(
        // Payload
        {_id, email},
        // Seed
        process.env.JWT_SECRET_SEED,
        // Options
        { expiresIn: '30d' }
    )
}