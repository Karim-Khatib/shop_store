import mongoose from "mongoose";
export interface ErrorResponse {
    code: number;
    message: string | string[];
}
export function ErrorHandler(error: unknown):ErrorResponse {
   
    if (error instanceof Error) {
        return {
            code: 500,
            message: error.message,
        }
    }
    if (error instanceof mongoose.Error.ValidationError) {
        const errors = Object.values(error.errors).map((err) => err.message);
        return {
            code: 400,
            message: errors,
        };
    }
    if (error instanceof mongoose.Error.CastError) {
        return {
            code: 400,
            message: "Invalid ID",
        }
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return {
            code: 404,
            message: "Document not found",
        }
    }
    if (error instanceof mongoose.Error.ValidatorError) {
        return {
            code: 400,
            message: "Validation failed",
        }
    }
    if (error instanceof mongoose.Error.OverwriteModelError) {
        return {
            code: 400,
            message: "Cannot overwrite model once compiled",
        }
    }
    if (error instanceof mongoose.Error.MissingSchemaError) {
        return {
            code: 400,
            message: "Missing schema",
        }
    }
    if (error instanceof mongoose.Error.DivergentArrayError) {
        return {
            code: 400,
            message: "Array path conflict detected",
        }
    }
    if (error instanceof mongoose.Error.ObjectExpectedError) {
        return {
            code: 400,
            message: `Invalid value for path: ${error.path}`,
        }
    }
    if (error instanceof mongoose.Error.ObjectParameterError) {
        return {
            code: 400,
            message: "Invalid object parameter",
        }
    }
    if (error instanceof mongoose.Error.ParallelSaveError) {
        return {
            code: 400,
            message: "Parallel save conflict",
        }
    }
    if (error instanceof mongoose.Error.ParallelValidateError) {
        return {
            code: 400,
            message: "Parallel validation conflict",
        }
    }
    if (error instanceof mongoose.Error.MongooseServerSelectionError) {
        return {
            code: 503,
            message: "Database connection error",
        }
    }
    if (error instanceof mongoose.Error.StrictModeError) {
        return {
            code: 400,
            message: `Strict mode violation: ${error.path}`,
        }
    }
    if (error instanceof mongoose.Error.VersionError) {
        return {
            code: 409,
            message: "Document version conflict",
        }
    }
    if (error instanceof mongoose.Error.StrictPopulateError) {
        return {
            code: 400,
            message: `Invalid populate path: ${error.path}`,
        }
    }
    if (error instanceof mongoose.Error.MongooseBulkSaveIncompleteError) {
        return {
            code: 500,
            message: "Bulk save operation incomplete",
        }
    }
    if (error instanceof mongoose.Error.SyncIndexesError) {
        return {
            code: 500,
            message: "Index synchronization failed",
        }
    }

    return {
        code: 500,
        message: "Unknown error occurred",
    }
}