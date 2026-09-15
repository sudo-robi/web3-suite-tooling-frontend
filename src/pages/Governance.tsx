import { useState, useEffect } from 'react';
import { Card } from '../components/Card.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { getProposals, getProposalCount } from '../services/api.js';
import type { Proposal } from '../types/index.js';

function ProposalCard({ proposal }: { proposal: Proposal }) {
  const totalVotes = BigInt(proposal.forVotes) + BigInt(proposal.againstVotes) + BigInt(proposal.abstainVotes);
  const forPercent = totalVotes > 0 ? Number(BigInt(proposal.forVotes) * 100n / totalVotes) : 0;

  const status = proposal.canceled
    ? { label: 'Canceled', color: 'bg-gray-100 text-gray-700' }
    : proposal.executed
    ? { label: 'Executed', color: 'bg-green-100 text-green-700' }
    : Date.now() / 1000 > proposal.endTime
    ? { label: 'Voting Closed', color: 'bg-yellow-100 text-yellow-700' }
    : { label: 'Active', color: 'bg-blue-100 text-blue-700' };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{proposal.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{proposal.description}</p>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
          {status.label}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Proposer</span>
          <span className="font-mono text-gray-700">
            {proposal.proposer.slice(0, 8)}...{proposal.proposer.slice(-4)}
          </span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-green-600">For: {proposal.forVotes}</span>
            <span className="text-red-600">Against: {proposal.againstVotes}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${forPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Ends: {new Date(proposal.endTime * 1000).toLocaleDateString()}</span>
          <span>{Number(totalVotes)} votes</span>
        </div>
      </div>
    </div>
  );
}

export function Governance() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [countResp, proposalsResp] = await Promise.all([
        getProposalCount(),
        getProposals(1, 20),
      ]);

      if (countResp.success && countResp.data !== undefined) {
        setTotal(countResp.data);
      }
      if (proposalsResp.success && proposalsResp.data) {
        setProposals(proposalsResp.data);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Governance Portal</h1>
        <p className="text-gray-600 mt-1">
          Participate in decentralized governance for Web3 Suite Tooling
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">{total} total proposals</p>
            <button className="px-4 py-2 bg-stellar-500 hover:bg-stellar-600 text-white rounded-lg text-sm font-medium transition-colors">
              Create Proposal
            </button>
          </div>

          {proposals.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {proposals.map(proposal => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          ) : (
            <Card title="No Proposals Yet">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🗳️</span>
                </div>
                <p className="text-gray-600 mb-4">
                  No governance proposals have been created yet.
                </p>
                <p className="text-sm text-gray-500">
                  Connect your wallet and create the first proposal to start decentralized governance.
                </p>
              </div>
            </Card>
          )}

          <Card title="How Governance Works">
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                The Governance contract enables token-weighted voting on proposals.
                Community members can submit proposals, and token holders vote
                to approve or reject them.
              </p>
              <ul className="mt-2 space-y-1">
                <li><strong>Create:</strong> Submit a proposal with title, description, and target action</li>
                <li><strong>Vote:</strong> Cast For, Against, or Abstain votes weighted by token holdings</li>
                <li><strong>Execute:</strong> Passed proposals are executed on-chain by the admin</li>
                <li><strong>Quorum:</strong> Minimum votes required for a proposal to be valid</li>
              </ul>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
