"use server";

import axios from "axios";
import M3tersABI from "~~/ABI/m3ter.json";
import { PublicClient } from "~~/config/clients";

const M3tersAddress = "0x39fb420Bd583cCC8Afd1A1eAce2907fe300ABD02";

export type Token = {
  name: string;
  description: string;
  attributes: any[];
  image: string;
  id: number;
};

export async function balanceOf({ address }: { address: string }): Promise<any> {
  try {
    const data = await PublicClient.readContract({
      address: M3tersAddress,
      abi: M3tersABI,
      functionName: "balanceOf",
      args: [address],
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function tokenOfOwnerByIndex({ owner }: { owner: string }): Promise<number[]> {
  try {
    const tokenIds = [];
    const balance = await balanceOf({ address: owner });
    for (let index = 0; index < balance; index++) {
      const id = await PublicClient.readContract({
        address: M3tersAddress,

        abi: M3tersABI,
        functionName: "tokenOfOwnerByIndex",
        args: [owner, index],
      });
      tokenIds.push(id as number);
    }
    return tokenIds;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
type getUsersTokensRes = {
  uri: string;
  id: number;
};
export async function getUsersTokens({ user }: { user: string }): Promise<getUsersTokensRes[]> {
  try {
    const tokenIds = await tokenOfOwnerByIndex({
      owner: user,
    });
    const tokens = [];
    for (let index = 0; index < tokenIds.length; index++) {
      const uri = await PublicClient.readContract({
        address: M3tersAddress,
        abi: M3tersABI,
        functionName: "tokenURI",
        args: [tokenIds[index]],
      });
      tokens.push({ uri: uri as string, id: tokenIds[index] });
    }
    return tokens;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchTokens({ user }: { user: string }): Promise<Token[]> {
  try {
    const extractedData = [];
    const tokens = await getUsersTokens({ user });
    for (let index = 0; index < tokens.length; index++) {
      const data = (await axios.get(tokens[index].uri)).data;
      const token: Token = {
        name: data.name,
        description: data.description,
        attributes: data.attributes,
        image: data.image,
        id: tokens[index].id,
      };
      extractedData.push(token);
    }
    return extractedData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
