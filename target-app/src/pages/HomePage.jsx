import React from 'react';
import { Link as LinkBase } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    text-align: center;
`;

const Link = styled(LinkBase)`
    color: white;
    font-weight: bold;
    text-decoration: none;
`;

const Label = styled.div`
    background-color: #0E76A8;
    border-radius: 8px;
    padding: 16px;
    max-width: 400px;
    margin: 16px auto;
    font-size: 24px;
`;

export const HomePage = () => (
    <Wrapper>
        <h1>Welcome to the Modern Testing Workshop</h1>
        <Link to='/example-1'>
            <Label>Example 1: simple assertion</Label>
        </Link>
        <Link to='/example-2'>
            <Label>Example 2: text input</Label>
        </Link>
        <Link to='/example-3'>
            <Label>Example 3: multiple inputs</Label>
        </Link>
        <Link to='/example-4'>
            <Label>Example 4: Click, check, select </Label>
        </Link>
    </Wrapper>
)