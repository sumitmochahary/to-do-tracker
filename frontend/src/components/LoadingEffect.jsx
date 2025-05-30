import { Backdrop, CircularProgress } from "@mui/material"

function LoadingEffect({ loading }) {
    return (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoadingEffect