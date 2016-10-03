import * as express from 'express';
import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

const app = express();

var opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';

passport.use(new Strategy(opts, (jwt_payload, done) => {
    if (jwt_payload.name.includes('Doe')) {
        done(null, { user: 'Teste' });
    }
    else {
        done(null, false);
    }
}));

function authenticate(useAuth) {
    if(useAuth){
        return passport.authenticate('jwt', { session: false });
    } else {
        return (req, res, next) => next();
    }
}

app.get('/', authenticate(false), (req, res) => {
    res.send('Hello World!');
});

app.get('/auth', authenticate(true), (req, res) => {
    res.send('Hello World!');
});

app.listen(5000, () => {
    console.log('Example app!');
});