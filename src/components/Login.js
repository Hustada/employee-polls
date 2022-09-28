import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

function App() {
  return (
    <CssVarsProvider>
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 400,
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
       >
        <div>
          <Typography level="h4" component="h1" sx={{ textAlign: "center"}}>
            <b>Employee Polls</b>
          </Typography>
          <Typography level="body2" sx={{ textAlign: "center"}}>Sign in to continue</Typography>
        </div>
        <TextField
          // html input attribute
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          // pass down to FormLabel as children
          label="Email"
        />
        <TextField
          name="password"
          type="password"
          placeholder="password"
          label="Password"
        />
        <Button
          variant="outlined"
          sx={{
            mt: 1, // margin top
            color: "orange",
            borderColor: "orange"          }}
        >
          Log in
        </Button>
        <Typography
          endDecorator={<Link sx={{
            color: "orange"
          }}href="/sign-up">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don't have an account?
        </Typography>
      </Sheet>
      
    </CssVarsProvider>
  );
}

export default App;
