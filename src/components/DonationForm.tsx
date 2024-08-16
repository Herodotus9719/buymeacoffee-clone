'use client';
import { createDonation } from "@/actions/donationActions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function DonationForm() {
    const [numberInValue, setNumberInValue] = useState('');
    const [amount, setAmount] = useState(3);
    const [crypto, setCrypto] = useState('btc');

    useEffect(()=> {
        if (numberInValue) {
            const intValue = parseInt(numberInValue);
            if (intValue <= 1000 && intValue > 0) {
                setAmount(intValue);
            } else {
                setAmount(1);
            }
        }
    }, [numberInValue]);

    async function handleFormSubmit(formData:FormData) {
        formData.set('amount', amount.toString());
        formData.set('crypto', crypto);
        const url = await createDonation(formData);
        if (window && window.location) {
            window.location.href = url;
        }
    }

    return (
        <>
            <form action={handleFormSubmit}>
                <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-4 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCoffee} />
                    <span>x</span>
                    <button
                        type="button"
                        onClick={()=>{setAmount(1); setNumberInValue('1')}}
                        className={"amount " + (amount === 1 ? 'active' : '')}>
                            1
                    </button>
                    <button
                        type="button"
                        onClick={()=>{setAmount(3); setNumberInValue('3')}}
                        className={"amount " + (amount === 3 ? 'active' : '')}>
                            3
                    </button>
                    <button
                        type="button"
                        onClick={()=>{setAmount(5); setNumberInValue('5')}}
                        className={"amount " + (amount === 5 ? 'active' : '')}>
                            5
                    </button>
                    <input
                        className="w-12 h-12 border border-yellow-300 rounded-xl text-center"
                        type="number"
                        value={numberInValue}
                        placeholder="0"
                        onChange={ev=>setNumberInValue(ev.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <input name="name" type="text" placeholder="Your name" />
                </div>
                <div className="mt-2">
                    <textarea name="message" id="" placeholder="Say something if you wish"></textarea>
                </div>
                <div className="mt-2">
                    <h3 className="text-xs mb-1 text-gray-500 flex justify-center">Use selected crypto or card:</h3>
                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={()=>setCrypto('btc')}
                            className={"crypto " + (crypto === 'btc' ? 'active' : '')}>
                            <span>BTC</span>
                            <p>BITCOIN</p>
                        </button>
                        <button
                            type="button"
                            onClick={()=>setCrypto('eth')}
                            className={"crypto " + (crypto === 'eth' ? 'active' : '')}>
                            <span>ETH</span>
                            <p>ETHEREUM</p>
                        </button>
                        <button
                            type="button"
                            onClick={()=>setCrypto('ltc')}
                            className={"crypto " + (crypto === 'ltc' ? 'active' : '')}>
                            <span>LTC</span>
                            <p>LITECOIN</p>
                        </button>
                    </div>
                </div>
                <div className="mt-2">
                    <button className="bg-yellow-300 w-full rounded-xl py-2 font-semibold">
                        Support ${amount*5}
                    </button>
                </div>
            </form>
        </>
    )
}
