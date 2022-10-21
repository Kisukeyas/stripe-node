const stripe = require('stripe')('sk_test_51Lv96DDEKXzP1FvZEqMO1337mbw7GbIfGX6mtJsgIOSWufWjKO6lAqaAlqb0CkB4baSaFSZ4uUSbqR1YlSzU2fbS00KieKVF9T');
const express = require('express');
const app = express();

app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';



app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: 'price_1LvBezDEKXzP1FvZPHtQrzdC',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
    });
    res.redirect(303, session.url)
})

app.get('/success', (req,res) => {
    res.send('成功！！！')
})
app.get('/cancel', (req,res) => {
    res.send('失敗！！')
})

app.listen(3000, () => {console.log('Running on port 3000')});